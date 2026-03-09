const mongoose = require("mongoose");

const ACTIVITY_TYPES = [
  "CREATED",
  "ASSIGNED",
  "STATUS_CHANGE",
  "VISIT_SCHEDULED",
  "VISIT_COMPLETED",
  "BOOKED",
];

const activitySchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    type: {
      type: String,
      enum: ACTIVITY_TYPES,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = {
  Activity,
  ACTIVITY_TYPES,
};

