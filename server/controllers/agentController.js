const Agent = require("../models/Agent");

// POST /api/agents
async function createAgent(req, res) {
  try {
    const { name, email, active } = req.body || {};

    if (!name || !email) {
      return res.status(400).json({ message: "name and email are required" });
    }

    const existing = await Agent.findOne({ email }).exec();
    if (existing) {
      return res.status(409).json({ message: "Agent with this email already exists" });
    }

    const agent = await Agent.create({
      name,
      email,
      active: active !== undefined ? active : true,
    });

    return res.status(201).json(agent);
  } catch (err) {
    console.error("Error creating agent:", err.message);
    return res.status(500).json({ message: "Failed to create agent" });
  }
}

// GET /api/agents
async function getAgents(_req, res) {
  try {
    const agents = await Agent.find({}).sort({ createdAt: 1 }).lean().exec();
    return res.json(agents);
  } catch (err) {
    console.error("Error fetching agents:", err.message);
    return res.status(500).json({ message: "Failed to fetch agents" });
  }
}

module.exports = {
  createAgent,
  getAgents,
};

