const express = require("express");
const { requireAuth } = require("../middleware/requireAuth");
const { getUserPreferences, mathTopics, studyTracks, updateUserPreferences } = require("../services/preferences");

const router = express.Router();

router.get("/", requireAuth, async (request, response) => {
  response.json({
    preferences: await getUserPreferences(request.user.id),
    mathTopics,
    studyTracks
  });
});

router.put("/", requireAuth, async (request, response) => {
  response.json({
    preferences: await updateUserPreferences(request.user.id, request.body),
    mathTopics,
    studyTracks
  });
});

module.exports = router;

