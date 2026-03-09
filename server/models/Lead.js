const mongoose = require("mongoose");

const LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "REQUIREMENT_COLLECTED",
  "PROPERTY_SUGGESTED",
  "VISIT_SCHEDULED",
  "VISIT_COMPLETED",
  "BOOKED",
  "LOST",
];

const SOURCES = ["website", "whatsapp", "phone", "social"];

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      enum: SOURCES,
      default: "website",
    },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "NEW",
    },
    assignedAgent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
    },
    needsFollowUp: {
      type: Boolean,
      default: false,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = {
  Lead,
  LEAD_STATUSES,
  SOURCES,
};

