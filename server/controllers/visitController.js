const { Visit, VISIT_OUTCOMES } = require("../models/Visit");
const { Lead } = require("../models/Lead");
const { Activity } = require("../models/Activity");

async function recordActivity(leadId, type, description) {
  await Promise.all([
    Activity.create({ leadId, type, description }),
    Lead.findByIdAndUpdate(
      leadId,
      { lastActivityAt: new Date(), needsFollowUp: false },
      { new: false },
    ).exec(),
  ]);
}

// POST /api/visits
async function createVisit(req, res) {
  try {
    const { leadId, property, date, time, notes } = req.body || {};

    if (!leadId || !property || !date || !time) {
      return res
        .status(400)
        .json({ message: "leadId, property, date and time are required" });
    }

    const lead = await Lead.findById(leadId).exec();
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    const visit = await Visit.create({
      leadId,
      property,
      date,
      time,
      notes,
    });

    await recordActivity(
      leadId,
      "VISIT_SCHEDULED",
      `Visit scheduled at ${property}`,
    );

    // Optionally push the lead into VISIT_SCHEDULED stage if not already further along.
    if (
      ["NEW", "CONTACTED", "REQUIREMENT_COLLECTED", "PROPERTY_SUGGESTED"].includes(
        lead.status,
      )
    ) {
      lead.status = "VISIT_SCHEDULED";
      lead.updatedAt = new Date();
      await lead.save();
    }

    const populatedVisit = await Visit.findById(visit._id)
      .populate("leadId")
      .lean()
      .exec();

    return res.status(201).json(populatedVisit);
  } catch (err) {
    console.error("Error creating visit:", err.message);
    return res.status(500).json({ message: "Failed to create visit" });
  }
}

// GET /api/visits
async function getVisits(_req, res) {
  try {
    const visits = await Visit.find({})
      .sort({ date: 1, time: 1 })
      .populate("leadId")
      .lean()
      .exec();
    return res.json(visits);
  } catch (err) {
    console.error("Error fetching visits:", err.message);
    return res.status(500).json({ message: "Failed to fetch visits" });
  }
}

// PATCH /api/visits/:id/outcome
async function updateVisitOutcome(req, res) {
  try {
    const { id } = req.params;
    const { outcome } = req.body || {};

    if (!outcome || !VISIT_OUTCOMES.includes(outcome)) {
      return res.status(400).json({ message: "Invalid outcome value" });
    }

    const visit = await Visit.findById(id).exec();
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    visit.outcome = outcome;
    await visit.save();

    const lead = await Lead.findById(visit.leadId).exec();
    if (lead) {
      // If the visit resulted in a booking, reflect that on the lead.
      if (outcome === "BOOKED") {
        lead.status = "BOOKED";
      } else if (outcome === "VISIT_DONE" && lead.status === "VISIT_SCHEDULED") {
        lead.status = "VISIT_COMPLETED";
      }
      lead.updatedAt = new Date();
      lead.lastActivityAt = new Date();
      lead.needsFollowUp = false;
      await lead.save();
    }

    const description =
      outcome === "BOOKED"
        ? "Booking confirmed after visit"
        : `Visit outcome updated to ${outcome}`;

    await recordActivity(visit.leadId, "VISIT_COMPLETED", description);

    const populatedVisit = await Visit.findById(visit._id)
      .populate("leadId")
      .lean()
      .exec();

    return res.json(populatedVisit);
  } catch (err) {
    console.error("Error updating visit outcome:", err.message);
    return res.status(500).json({ message: "Failed to update visit outcome" });
  }
}

module.exports = {
  createVisit,
  getVisits,
  updateVisitOutcome,
};

