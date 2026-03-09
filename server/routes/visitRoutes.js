const express = require("express");
const {
  createVisit,
  getVisits,
  updateVisitOutcome,
} = require("../controllers/visitController");

const router = express.Router();

router.post("/", createVisit);
router.get("/", getVisits);
router.patch("/:id/outcome", updateVisitOutcome);

module.exports = router;

