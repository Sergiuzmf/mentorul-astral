const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { awardStudyXp, getLeaderboard, getUserProgression } = require("../services/progression");

const router = express.Router();

router.get("/", requireAuth, async (request, response) => {
  response.json({
    progression: await getUserProgression(request.user.id),
    leaderboard: await getLeaderboard(10)
  });
});

router.post("/study-complete", requireAuth, async (request, response) => {
  const result = await awardStudyXp({
    userId: request.user.id,
    minutes: Number(request.body.minutes || 45),
    topic: request.body.topic || "general"
  });

  response.status(201).json(result);
});

module.exports = router;

