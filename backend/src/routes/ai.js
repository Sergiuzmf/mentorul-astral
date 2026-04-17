const express = require("express");
const { constellationGuide } = require("../data/constellations");
const { requireAuth } = require("../middleware/requireAuth");
const {
  analyzeMockTest,
  buildLibraryRecommendations,
  generateGoalPlan,
  generateStudySession,
  generateMockTest,
  getAiStatus,
  listSavedExplanations,
  saveExplanation,
  streamTutorConversation
} = require("../services/aiTutor");

const router = express.Router();

router.get("/status", requireAuth, async (request, response) => {
  response.json(await getAiStatus(request.user.id));
});

router.get("/constellations", requireAuth, (request, response) => {
  response.json({ constellations: constellationGuide });
});

router.get("/notes", requireAuth, async (request, response) => {
  response.json({ notes: await listSavedExplanations(request.user.id) });
});

router.post("/notes", requireAuth, async (request, response) => {
  response.status(201).json({ note: await saveExplanation(request.user.id, request.body) });
});

router.post("/plan", requireAuth, async (request, response) => {
  response.json({ plan: await generateGoalPlan({ userId: request.user.id }) });
});

router.post("/study-session", requireAuth, async (request, response) => {
  response.json({
    session: await generateStudySession({
      userId: request.user.id,
      minutes: Number(request.body.minutes || 45)
    })
  });
});

router.get("/library", requireAuth, async (request, response) => {
  response.json({
    library: await buildLibraryRecommendations(request.user.id)
  });
});

router.post("/mock-tests/generate", requireAuth, async (request, response) => {
  response.json({
    test: await generateMockTest({
      userId: request.user.id,
      topic: request.body.topic,
      difficulty: request.body.difficulty || "adaptive",
      timeLimit: Number(request.body.timeLimit || 90)
    })
  });
});

router.post("/mock-tests/analyze", requireAuth, async (request, response) => {
  response.json({
    analysis: await analyzeMockTest({
      userId: request.user.id,
      test: request.body.test,
      answers: request.body.answers || []
    })
  });
});

router.post("/chat/stream", requireAuth, async (request, response) => {
  try {
    await streamTutorConversation({
      userId: request.user.id,
      sessionId: request.body.sessionId || "default-session",
      message: request.body.message || "",
      topicTag: request.body.topicTag || "general",
      imageDataUrl: request.body.imageDataUrl || null,
      response
    });
  } catch (error) {
    if (!response.headersSent) {
      response.status(error.status || 500).json({ message: error.message || "AI tutor error." });
      return;
    }
    response.write(`data: ${JSON.stringify({ type: "error", message: error.message || "AI tutor error." })}\n\n`);
    response.end();
  }
});

module.exports = router;
