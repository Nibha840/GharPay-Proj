const express = require("express");
const {
  createLead,
  getLeads,
  getLeadById,
  updateLeadStatus,
  deleteLead,
  getLeadActivities,
} = require("../controllers/leadController");

const router = express.Router();

router.post("/", createLead);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.patch("/:id/status", updateLeadStatus);
router.delete("/:id", deleteLead);
router.get("/:id/activities", getLeadActivities);

module.exports = router;

