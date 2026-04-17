const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { generateGoalPlan, getUserGoals, upsertUserGoals } = require("../services/aiTutor");

const router = express.Router();

router.get("/", requireAuth, async (request, response) => {
  response.json({ goals: await getUserGoals(request.user.id) });
});

router.put("/", requireAuth, async (request, response) => {
  const goals = await upsertUserGoals(request.user.id, {
    dailyMinutes: Number(request.body.dailyMinutes || 60),
    daysPerWeek: Number(request.body.daysPerWeek || 5),
    intensityMode: request.body.intensityMode || "normal",
    preferredTime: request.body.preferredTime || null,
    autoAdjust: request.body.autoAdjust !== false
  });

  response.json({ goals, plan: await generateGoalPlan({ userId: request.user.id }) });
});

module.exports = router;
