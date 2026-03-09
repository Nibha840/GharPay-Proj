const { Lead, LEAD_STATUSES } = require("../models/Lead");
const Agent = require("../models/Agent");
const { Activity } = require("../models/Activity");
const { assignNextAgent } = require("../services/assignmentService");





// Helper to record an activity and keep lead.lastActivityAt fresh.
async function recordActivity(leadId, type, description) {
  const [activity] = await Promise.all([
    Activity.create({ leadId, type, description }),
    Lead.findByIdAndUpdate(
      leadId,
      { lastActivityAt: new Date(), needsFollowUp: false },
      { new: false },
    ).exec(),
  ]);
  return activity;
}

// POST /api/leads
async function createLead(req, res) {
  try {
    const { name, phone, source, notes } = req.body || {};

    if (!name || !phone) {
      return res.status(400).json({ message: "name and phone are required" });
    }

    let assignedAgent = await assignNextAgent();

    const lead = await Lead.create({
      name,
      phone,
      source,
      status: "NEW",
      assignedAgent: assignedAgent ? assignedAgent._id : undefined,
      lastActivityAt: new Date(),
    });

    await recordActivity(lead._id, "CREATED", "Lead created");

    if (assignedAgent) {
      await recordActivity(
        lead._id,
        "ASSIGNED",
        `Assigned to ${assignedAgent.name}`,
      );
    }

    if (notes && typeof notes === "string" && notes.trim()) {
      await recordActivity(lead._id, "STATUS_CHANGE", `Notes: ${notes.trim()}`);
    }

    const populatedLead = await Lead.findById(lead._id)
      .populate("assignedAgent")
      .lean()
      .exec();

    return res.status(201).json(populatedLead);
  } catch (err) {
    console.error("Error creating lead:", err.message);
    return res.status(500).json({ message: "Failed to create lead" });
  }
}

// GET /api/leads
async function getLeads(_req, res) {
  try {
    const leads = await Lead.find({})
      .sort({ createdAt: -1 })
      .populate("assignedAgent")
      .lean()
      .exec();
    return res.json(leads);
  } catch (err) {
    console.error("Error fetching leads:", err.message);
    return res.status(500).json({ message: "Failed to fetch leads" });
  }
}

// GET /api/leads/:id
async function getLeadById(req, res) {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id).populate("assignedAgent").lean().exec();
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    return res.json(lead);
  } catch (err) {
    console.error("Error fetching lead:", err.message);
    return res.status(500).json({ message: "Failed to fetch lead" });
  }
}

// PATCH /api/leads/:id/status
async function updateLeadStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    if (!status || !LEAD_STATUSES.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const lead = await Lead.findById(id).exec();
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    lead.status = status;
    lead.updatedAt = new Date();
    lead.lastActivityAt = new Date();
    lead.needsFollowUp = false;

    await lead.save();

    await recordActivity(
      lead._id,
      "STATUS_CHANGE",
      `Status changed to ${status}`,
    );

    const populatedLead = await Lead.findById(lead._id)
      .populate("assignedAgent")
      .lean()
      .exec();

    return res.json(populatedLead);
  } catch (err) {
    console.error("Error updating lead status:", err.message);
    return res.status(500).json({ message: "Failed to update lead status" });
  }
}

// DELETE /api/leads/:id
async function deleteLead(req, res) {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id).exec();
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    // Clean up related activities and visits silently; frontend does not depend
    // on this response having details.
    const { Visit } = require("../models/Visit");
    await Promise.all([
      Activity.deleteMany({ leadId: id }).exec(),
      Visit.deleteMany({ leadId: id }).exec(),
    ]);

    return res.status(204).send();
  } catch (err) {
    console.error("Error deleting lead:", err.message);
    return res.status(500).json({ message: "Failed to delete lead" });
  }
}

// GET /api/leads/:id/activities
async function getLeadActivities(req, res) {
  try {
    const { id } = req.params;
    const activities = await Activity.find({ leadId: id })
      .sort({ timestamp: 1 })
      .lean()
      .exec();
    return res.json(activities);
  } catch (err) {
    console.error("Error fetching activities:", err.message);
    return res.status(500).json({ message: "Failed to fetch activities" });
  }
}

module.exports = {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  getLeadActivities,
};

