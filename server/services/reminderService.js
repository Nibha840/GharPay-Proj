const cron = require("node-cron");
const { Lead } = require("../models/Lead");

/**
 * Every hour, mark leads that have had no activity for 24 hours as
 * needing follow-up. This sets `needsFollowUp = true` on the Lead.
 */
function startReminderJob() {
  // Run at minute 0 of every hour.
  cron.schedule("0 * * * *", async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
      const result = await Lead.updateMany(
        {
          lastActivityAt: { $lt: cutoff },
          needsFollowUp: { $ne: true },
        },
        {
          $set: { needsFollowUp: true },
        },
      );

      if (result.modifiedCount) {
        console.log(
          `Reminder job: marked ${result.modifiedCount} lead(s) as needing follow-up.`,
        );
      }
    } catch (err) {
      console.error("Reminder job error:", err.message);
    }
  });
}

module.exports = {
  startReminderJob,
};

