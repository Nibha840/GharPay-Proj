const mongoose = require("mongoose");

const VISIT_OUTCOMES = ["VISIT_DONE", "BOOKED", "NO_SHOW", "NOT_INTERESTED"];

const visitSchema = new mongoose.Schema(
  {
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lead",
      required: true,
    },
    property: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    outcome: {
      type: String,
      enum: VISIT_OUTCOMES,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Visit = mongoose.model("Visit", visitSchema);

module.exports = {
  Visit,
  VISIT_OUTCOMES,
};

