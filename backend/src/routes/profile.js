const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { getLearningProfile, getUserGoals } = require("../services/aiTutor");
const { getUserPreferences } = require("../services/preferences");
const { getLeaderboard, getUserProgression } = require("../services/progression");

const router = express.Router();

router.get("/", requireAuth, async (request, response) => {
  const [profile, goals, preferences] = await Promise.all([
    getLearningProfile(request.user.id),
    getUserGoals(request.user.id),
    getUserPreferences(request.user.id)
  ]);

  const [progression, leaderboard] = await Promise.all([
    getUserProgression(request.user.id),
    getLeaderboard(8)
  ]);

  response.json({
    profile: {
      conceptMastery: profile.concept_mastery || {},
      learningStyle: profile.learning_style,
      commonMistakes: profile.common_mistakes || [],
      preferredPace: profile.preferred_pace,
      conversationContext: profile.conversation_context,
      lastSessionSummary: profile.last_session_summary
    },
    goals,
    preferences,
    progression,
    leaderboard
  });
});

module.exports = router;
