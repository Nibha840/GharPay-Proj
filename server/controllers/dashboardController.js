const { Lead } = require("../models/Lead");
const { Visit } = require("../models/Visit");
const Agent = require("../models/Agent");

// GET /api/dashboard
async function getDashboardStats(_req, res) {
  try {

    const [totalLeads, leadsByStageAgg, visits, agents] = await Promise.all([
      Lead.countDocuments({}).exec(),

      Lead.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]).exec(),

      Visit.find({}).lean().exec(),

      Agent.find({ active: true }).lean().exec()
    ]);

    const leadsByStage = {};

    leadsByStageAgg.forEach((row) => {
      if (row && row._id) {
        leadsByStage[row._id] = row.count;
      }
    });

    const bookingsConfirmed = await Lead.countDocuments({
      status: "BOOKED"
    }).exec();

    // Agent lead stats
    const leadsByAgentAgg = await Lead.aggregate([
      { $match: { assignedAgent: { $ne: null } } },
      {
        $group: {
          _id: "$assignedAgent",
          leadsCount: { $sum: 1 },
          bookings: {
            $sum: {
              $cond: [{ $eq: ["$status", "BOOKED"] }, 1, 0]
            }
          }
        }
      }
    ]).exec();

    // Visits per agent
    const visitsByAgentAgg = await Visit.aggregate([
      {
        $lookup: {
          from: "leads",
          localField: "leadId",
          foreignField: "_id",
          as: "lead"
        }
      },
      { $unwind: "$lead" },
      {
        $group: {
          _id: "$lead.assignedAgent",
          visits: { $sum: 1 }
        }
      }
    ]).exec();

    const leadsByAgentMap = new Map();
    leadsByAgentAgg.forEach(row => {
      leadsByAgentMap.set(String(row._id), row);
    });

    const visitsByAgentMap = new Map();
    visitsByAgentAgg.forEach(row => {
      visitsByAgentMap.set(String(row._id), row);
    });

    const agentPerformance = agents.map(agent => {

      const leadsRow = leadsByAgentMap.get(String(agent._id));
      const visitsRow = visitsByAgentMap.get(String(agent._id));

      return {
        agent,
        leadsCount: leadsRow ? leadsRow.leadsCount : 0,
        bookings: leadsRow ? leadsRow.bookings : 0,
        visits: visitsRow ? visitsRow.visits : 0
      };

    });

    return res.json({
      totalLeads,
      leadsByStage,
      visitsScheduled: visits.length,
      bookingsConfirmed,
      agentPerformance
    });

  } catch (err) {

    console.error("Error building dashboard stats:", err.message);

    return res.status(500).json({
      message: "Failed to load dashboard stats"
    });

  }
}

module.exports = {
  getDashboardStats
};