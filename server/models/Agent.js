const mongoose = require("mongoose");

const agentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    leadsAssigned: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Agent = mongoose.model("Agent", agentSchema);

module.exports = Agent;

