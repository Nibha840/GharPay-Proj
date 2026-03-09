const mongoose = require("mongoose");
const Agent = require("../models/Agent");

// Simple collection to persist round-robin pointer across restarts.
const roundRobinStateSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  index: {
    type: Number,
    default: 0,
  },
});

const RoundRobinState =
  mongoose.models.RoundRobinState ||
  mongoose.model("RoundRobinState", roundRobinStateSchema);

/**
 * Returns the next active agent according to a round-robin strategy and
 * updates the internal pointer and agent.leadsAssigned counters.
 */
async function assignNextAgent() {
  const agents = await Agent.find({ active: true }).sort({ createdAt: 1 }).exec();
  if (!agents.length) {
    return null;
  }

  let state = await RoundRobinState.findOne({ key: "agent-assignment" }).exec();
  if (!state) {
    state = await RoundRobinState.create({ key: "agent-assignment", index: 0 });
  }

  const currentIndex = state.index % agents.length;
  const agent = agents[currentIndex];

  state.index = (currentIndex + 1) % agents.length;
  await state.save();

  agent.leadsAssigned += 1;
  await agent.save();

  return agent;
}

module.exports = {
  assignNextAgent,
};

