const crypto = require("crypto");
const { query } = require("../db");
const config = require("../config");
const { curatedTopicLibrary, remediationTemplates } = require("../data/curatedAstronomy");
const { lectureCatalog } = require("../data/learningCatalog");
const { awardMockTestXp } = require("./progression");
const { getUserPreferences } = require("./preferences");

const DEFAULT_GOALS = {
  dailyMinutes: 60,
  daysPerWeek: 5,
  intensityMode: "normal",
  preferredTime: null,
  autoAdjust: true
};

const LIBRARY_RESOURCES = {
  orbital_mechanics: [
    {
      id: "orbital-doc",
      type: "documentar",
      title: "Orbital Mechanics Essentials",
      note: "Urmareste un material video despre transferuri orbitale si compara-l cu notitele tale."
    },
    {
      id: "orbital-text",
      type: "fragment de carte",
      title: "Paragraful despre energia specifica orbitala",
      note: "Citeste partea care leaga energia, semiaxa mare si stabilitatea orbitei."
    }
  ],
  stellar_physics: [
    {
      id: "stellar-doc",
      type: "documentar",
      title: "Birth, Life and Death of Stars",
      note: "Un material bun dupa ce ai facut diagrama HR si legile de radiatie."
    }
  ],
  magnitude_scale: [
    {
      id: "photo-sheet",
      type: "fisa de recapitulare",
      title: "Magnitudini si distante intr-o pagina",
      note: "Perfecta dupa primul set de probleme de fotometrie."
    }
  ],
  constellations: [
    {
      id: "sky-guide",
      type: "ghid observational",
      title: "Repere rapide pe cerul din Romania",
      note: "Bun pentru consolidarea orientarii printre stele si obiecte Messier."
    }
  ]
};

function approximateTokens(text = "") {
  return Math.ceil(text.length / 4);
}

function hashContent(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function detectLearningStyle(message) {
  const lower = message.toLowerCase();
  if (/(desen|imagine|vizual|schema|diagram)/.test(lower)) return "visual";
  if (/(demonstreaza|derivare|formula|matematic)/.test(lower)) return "mathematical";
  return "conceptual";
}

function detectTopic(message, requestedTopic = "general") {
  const lower = `${requestedTopic} ${message}`.toLowerCase();
  if (/(kepler|orbita|hohmann|delta-v|gravita)/.test(lower)) return "orbital_mechanics";
  if (/(magnitudine|parsec|paralaxa|fotometr)/.test(lower)) return "magnitude_scale";
  if (/(stea|stelar|hr|luminoz|wien|stefan)/.test(lower)) return "stellar_physics";
  if (/(ursa|orion|cassiopeia|polaris|constel)/.test(lower)) return "constellations";
  return requestedTopic || "general";
}

function buildStaticPlan(goals, profile) {
  const minutes = goals.dailyMinutes;
  const style = profile.learning_style || "conceptual";

  if (minutes <= 15) {
    return {
      title: "Sprint de 15 minute",
      sections: ["1 concept explicat", "1 problema rapida", "1 intrebare socratica"],
      coachMessage: "Astazi mergem pe claritate maxima in timp scurt."
    };
  }

  if (minutes <= 30) {
    return {
      title: "Sesiune compacta",
      sections: ["10 min teorie", "2 probleme", "recall de formule"],
      coachMessage: `Iti pregatesc un ritm ${style === "visual" ? "mai vizual" : "mai analitic"} si foarte practic.`
    };
  }

  if (minutes <= 60) {
    return {
      title: "Ora de Astrofizica",
      sections: ["15 min explicatie", "3 probleme adaptive", "recapitulare constelatii si formule"],
      coachMessage: "Avem timp pentru o sesiune completa si serioasa."
    };
  }

  return {
    title: "Mod aprofundat",
    sections: ["lectie cu derivari", "3-4 probleme", "mini-mock", "fisa finala"],
    coachMessage: "Azi putem lucra aproape ca intr-un cantonament ONAA."
  };
}

function getStrongestAndWeakestTopics(profile) {
  const entries = Object.entries(profile.concept_mastery || {});
  const sorted = entries.sort((a, b) => Number(a[1]) - Number(b[1]));
  return {
    weakest: sorted[0]?.[0] || null,
    strongest: sorted[sorted.length - 1]?.[0] || null
  };
}

function buildStudySession({ profile, minutes }) {
  return buildStudySessionWithPreferences({ profile, minutes, preferences: { lastMathTopic: "Algebra de baza", selectedTracks: ["astrophysics", "astronomy"] } });
}

function buildStudySessionWithPreferences({ profile, minutes, preferences }) {
  const { weakest, strongest } = getStrongestAndWeakestTopics(profile);
  const isNewUser = !Object.keys(profile.concept_mastery || {}).length && !profile.last_session_summary;
  const chosenTopic = isNewUser ? "general_intro" : weakest || "orbital_mechanics";
  const selectedTracks = preferences.selectedTracks || ["astrophysics", "astronomy"];
  const matchingLecture =
    lectureCatalog.find((lecture) => isNewUser && lecture.id === "intro-onaa") ||
    lectureCatalog.find((lecture) =>
      selectedTracks.includes(lecture.track) &&
      (lecture.topicTag === chosenTopic || lecture.mathRequirement === preferences.lastMathTopic)
    ) ||
    lectureCatalog.find((lecture) => selectedTracks.includes(lecture.track)) ||
    lectureCatalog[0];

  if (isNewUser) {
    return {
      topic: "general",
      lectureId: "intro-onaa",
      title: "Baza ONAA: prima ta lectie ghidata",
      reason: "Esti la inceput, deci pornim cu fundamentele: ce studiaza astronomia, ce studiaza astrofizica si cum gandesti problemele de olimpiada.",
      goals: [
        "Intelegi diferenta dintre astronomie observationala si astrofizica.",
        "Afli ce formule si marimi apar frecvent la ONAA.",
        "Primesti o prima harta mentala a temelor mari."
      ],
      openingPrompt: `Porneste o lectie introductiva de ${minutes} minute pentru un elev nou la ONAA. Preda ca un profesor calm si clar, in romana. Acopera: diferenta dintre astronomie si astrofizica, marimi fizice uzuale, cum abordezi o problema, apoi verifica intelegerea cu 2 intrebari scurte.`,
      nextResourceHint: "Dupa lectie, mergi in Biblioteca si continua cu fundamentele despre miscarea pe cer si marimi observationale.",
      resourceIds: matchingLecture.resourceIds
    };
  }

  const topicMap = {
    orbital_mechanics: "Mecanica orbitala",
    stellar_physics: "Fizica stelara",
    magnitude_scale: "Fotometrie si distante",
    constellations: "Cerul noptii si orientare"
  };

  const coachReason = strongest
    ? `AI-ul a observat ca ai mai multa siguranta la ${topicMap[strongest] || strongest}, dar mai ai nevoie de consolidare la ${topicMap[chosenTopic] || chosenTopic}.`
    : `AI-ul iti recomanda sa consolidezi ${topicMap[chosenTopic] || chosenTopic} pe baza sesiunilor anterioare.`;

  return {
    topic: chosenTopic,
    lectureId: matchingLecture.id,
    title: matchingLecture.title || `${topicMap[chosenTopic] || "Tema zilei"} pentru azi`,
    reason: coachReason,
    goals:
      minutes <= 30
        ? ["O explicatie compacta", "1-2 intrebari ghidate", "O verificare rapida"]
        : ["O lectie pas cu pas", "Exemple explicate ca la clasa", "Verificare de intelegere si recapitulare"],
    openingPrompt: `${matchingLecture.openingPrompt} Durata disponibila este ${minutes} minute. Adapteaza ritmul la aceasta durata.`,
    nextResourceHint: chosenTopic === "orbital_mechanics"
      ? "Dupa lectie, Biblioteca iti va sugera un documentar sau un paragraf despre dinamica orbitala."
      : `Dupa lectie, Biblioteca iti va sugera resurse pentru ${topicMap[chosenTopic] || chosenTopic}.`,
    resourceIds: matchingLecture.resourceIds
  };
}

async function buildLibraryRecommendations(userId) {
  const profile = await getLearningProfile(userId);
  const { weakest, strongest } = getStrongestAndWeakestTopics(profile);
  const completedLike = strongest && Number((profile.concept_mastery || {})[strongest] || 0) >= 0.23 ? strongest : null;

  return {
    spotlightTopic: weakest || "orbital_mechanics",
    completedTopicSuggestion: completedLike
      ? LIBRARY_RESOURCES[completedLike] || []
      : [],
    sections: Object.entries(LIBRARY_RESOURCES).map(([topic, items]) => ({
      topic,
      items
    }))
  };
}

function safeEvaluateArithmetic(expression) {
  if (!/^[0-9+\-*/().\s^]+$/.test(expression)) return null;
  try {
    const result = Function(`"use strict"; return (${expression.replaceAll("^", "**")});`)();
    return Number.isFinite(result) ? result : null;
  } catch {
    return null;
  }
}

function analyzeMathMessage(message) {
  const lines = message.split("\n");
  const inlineMatches = [...message.matchAll(/(\d[\d+\-*/().^ ]*)=(\d[\d+\-*/().^ ]*)/g)].map(
    (match) => `${match[1].trim()} = ${match[2].trim()}`
  );
  const candidates = [...new Set([...lines, ...inlineMatches])].filter((line) => line.includes("="));

  return candidates
    .map((line) => {
      const [left, right] = line.split("=").map((part) => part.trim());
      const leftValue = safeEvaluateArithmetic(left);
      const rightValue = safeEvaluateArithmetic(right);
      if (leftValue === null || rightValue === null) return null;
      return {
        line: `${left} = ${right}`,
        isCorrect: Math.abs(leftValue - rightValue) < 1e-9,
        evaluatedLeft: leftValue,
        evaluatedRight: rightValue
      };
    })
    .filter(Boolean);
}

async function getUserGoals(userId) {
  const result = await query("SELECT * FROM user_goals WHERE user_id = $1", [userId]);
  if (result.rowCount === 0) return DEFAULT_GOALS;
  const row = result.rows[0];
  return {
    dailyMinutes: row.daily_minutes,
    daysPerWeek: row.days_per_week,
    intensityMode: row.intensity_mode,
    preferredTime: row.preferred_time,
    autoAdjust: row.auto_adjust
  };
}

async function upsertUserGoals(userId, goals) {
  const result = await query(
    `
      INSERT INTO user_goals (user_id, daily_minutes, days_per_week, intensity_mode, preferred_time, auto_adjust, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, NOW())
      ON CONFLICT (user_id)
      DO UPDATE SET
        daily_minutes = EXCLUDED.daily_minutes,
        days_per_week = EXCLUDED.days_per_week,
        intensity_mode = EXCLUDED.intensity_mode,
        preferred_time = EXCLUDED.preferred_time,
        auto_adjust = EXCLUDED.auto_adjust,
        updated_at = NOW()
      RETURNING *
    `,
    [userId, goals.dailyMinutes, goals.daysPerWeek, goals.intensityMode, goals.preferredTime, goals.autoAdjust]
  );
  return getUserGoals(userId);
}

async function getLearningProfile(userId) {
  const result = await query("SELECT * FROM ai_learning_profile WHERE user_id = $1", [userId]);
  if (result.rowCount) return result.rows[0];
  const inserted = await query(
    "INSERT INTO ai_learning_profile (user_id) VALUES ($1) RETURNING *",
    [userId]
  );
  return inserted.rows[0];
}

async function saveLearningProfile(userId, profile) {
  await query(
    `
      UPDATE ai_learning_profile
      SET concept_mastery = $2,
          learning_style = $3,
          common_mistakes = $4,
          preferred_pace = $5,
          conversation_context = $6,
          last_session_summary = $7,
          updated_at = NOW()
      WHERE user_id = $1
    `,
    [
      userId,
      JSON.stringify(profile.concept_mastery || {}),
      profile.learning_style || "conceptual",
      JSON.stringify(profile.common_mistakes || []),
      profile.preferred_pace || "normal",
      profile.conversation_context || "",
      profile.last_session_summary || ""
    ]
  );
}

async function listSavedExplanations(userId) {
  const result = await query(
    "SELECT id, title, content, source_topic, created_at FROM saved_explanations WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20",
    [userId]
  );
  return result.rows;
}

async function saveExplanation(userId, note) {
  const result = await query(
    "INSERT INTO saved_explanations (user_id, title, content, source_topic) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, note.title, note.content, note.sourceTopic || "general"]
  );
  return result.rows[0];
}

async function getConversationHistory(userId, sessionId, topicTag) {
  const result = await query(
    `SELECT role, content, created_at FROM ai_conversations
     WHERE user_id = $1 AND session_id = $2 AND topic_tag = $3
     ORDER BY created_at DESC LIMIT 10`,
    [userId, sessionId, topicTag]
  );
  return result.rows.reverse();
}

function summarizeHistory(history) {
  if (history.length <= 6) return "";
  return history
    .slice(0, -6)
    .map((item) => `${item.role}: ${item.content.slice(0, 100)}`)
    .join(" | ");
}

async function storeConversationMessage({ userId, sessionId, role, content, topicTag, tokensUsed = 0 }) {
  await query(
    "INSERT INTO ai_conversations (user_id, session_id, role, content, tokens_used, topic_tag) VALUES ($1, $2, $3, $4, $5, $6)",
    [userId, sessionId, role, content, tokensUsed, topicTag]
  );
}

async function enforceDailyRateLimit(userId) {
  const result = await query(
    "SELECT COUNT(*)::int AS total FROM ai_conversations WHERE user_id = $1 AND role = 'user' AND created_at::date = CURRENT_DATE",
    [userId]
  );
  if (result.rows[0].total >= config.aiDailyMessageLimit) {
    const error = new Error("Ai atins limita zilnica de mesaje AI.");
    error.status = 429;
    throw error;
  }
}

async function findCachedContent(contentHash) {
  const result = await query("SELECT * FROM ai_content_cache WHERE content_hash = $1 LIMIT 1", [contentHash]);
  if (!result.rowCount) return null;
  await query("UPDATE ai_content_cache SET used_count = used_count + 1, last_used = NOW() WHERE content_hash = $1", [contentHash]);
  return result.rows[0];
}

async function upsertCachedContent({ contentType, topic, difficulty, contentHash, generatedContent }) {
  await query(
    `
      INSERT INTO ai_content_cache (content_type, topic, difficulty, content_hash, generated_content, used_count, last_used)
      VALUES ($1, $2, $3, $4, $5::jsonb, 1, NOW())
      ON CONFLICT (content_hash)
      DO UPDATE SET generated_content = EXCLUDED.generated_content, used_count = ai_content_cache.used_count + 1, last_used = NOW()
    `,
    [contentType, topic, difficulty, contentHash, JSON.stringify(generatedContent)]
  );
}

function buildSystemPrompt({ profile, goals, topicTag, summary, mathChecks, curatedSnippet }) {
  const mathSummary = mathChecks.length
    ? mathChecks
        .map((item) => `${item.line} => ${item.isCorrect ? "corect" : `gresit (${item.evaluatedLeft} vs ${item.evaluatedRight})`}`)
        .join("; ")
    : "Nu exista verificari aritmetice detectate.";

  return `
Esti Profesorul Virtual ONAA, un profesor personal de astronomie si astrofizica pentru elevi de liceu din Romania.
Raspunzi in romana. La prima aparitie, pui termenii tehnici importanti in engleza intre paranteze.
Predai activ:
- explica formulele pas cu pas, cu variabile, unitati si semnificatie fizica
- foloseste metoda socratica inainte de raspunsul final
- daca elevul nu intelege, simplifica si foloseste analogii vizuale
- corecteaza bland si precis eventualele greseli de calcul
- propune un exemplu nou si o mini-verificare la final
- spune clar cand ceva este generat dinamic de AI versus continut curatat

Profil elev:
- stil: ${profile.learning_style || "conceptual"}
- ritm: ${profile.preferred_pace || "normal"}
- memorie lunga: ${profile.conversation_context || "goala"}
- ultima sesiune: ${profile.last_session_summary || "prima sesiune"}

Obiectiv zilnic:
- minute: ${goals.dailyMinutes}
- zile pe saptamana: ${goals.daysPerWeek}
- intensitate: ${goals.intensityMode}

Topic: ${topicTag}
Rezumat conversatii vechi: ${summary || "fara rezumat"}
Continut curatat: ${curatedSnippet || "nu exista"}
Verificare calcule: ${mathSummary}
`.trim();
}

function buildFallbackTutorReply({ topicTag, profile, goals, mathChecks }) {
  const curated = curatedTopicLibrary[topicTag] || null;
  const mathMistake = mathChecks.find((item) => !item.isCorrect);
  const styleLine =
    profile.learning_style === "visual"
      ? "Imagineaza-ti miscarea ca pe un traseu elastic desenat pe cer. "
      : "";

  return `${curated ? `Lucram pe ${curated.title}. ${curated.explanation}` : "Hai sa luam conceptul pas cu pas."} ${
    mathMistake ? `Am observat o posibila eroare la „${mathMistake.line}”. Verifica ordinea operatiilor si unitatile. ` : ""
  }${styleLine}Astazi avem ${goals.dailyMinutes} minute, deci mergem pe o explicatie concentrata si utila.\n\nIntrebare ghidata: ${
    curated?.socraticQuestions?.[0] || "Ce informatie din enunt iti spune ce formula trebuie folosita?"
  }`;
}

async function streamTextChunks(response, finalText) {
  const chunks = finalText.split(/(\s+)/).filter(Boolean);
  for (const chunk of chunks) {
    response.write(`data: ${JSON.stringify({ type: "delta", delta: chunk })}\n\n`);
    await new Promise((resolve) => setTimeout(resolve, 15));
  }
}

async function callOpenAIResponses({ input, stream }) {
  const raw = await fetch(`${config.openAiBaseUrl}/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.openAiApiKey}`
    },
    body: JSON.stringify({
      model: config.openAiModel,
      input,
      stream,
      temperature: 0.4,
      max_output_tokens: 900
    })
  });

  if (!raw.ok) {
    throw new Error(await raw.text());
  }

  return raw;
}

function extractJson(text) {
  const stripped = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/```$/, "").trim();
  return JSON.parse(stripped);
}

function extractResponseText(payload) {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  if (Array.isArray(payload?.output)) {
    return payload.output
      .flatMap((item) => item?.content || [])
      .map((item) => item?.text || item?.output_text || "")
      .join("")
      .trim();
  }

  return "";
}

function buildFallbackMockTest(chosenTopic, difficulty, timeLimit) {
  return {
    title: `Simulare adaptiva - ${chosenTopic}`,
    difficulty,
    timeLimit,
    questions: [
      {
        id: "q1",
        prompt: "Explica legea a III-a a lui Kepler si arata ce se intampla cu perioada daca semiaxa mare creste.",
        answerType: "text"
      },
      {
        id: "q2",
        prompt: "Calculeaza raportul de flux pentru o diferenta de 2.5 magnitudini si interpreteaza fizic rezultatul.",
        answerType: "text"
      },
      {
        id: "q3",
        prompt: "Descrie cum ai identifica Polaris folosind Carul Mare sau Cassiopeia pe cerul din Romania.",
        answerType: "text"
      }
    ]
  };
}

async function generateGoalPlan({ userId }) {
  const [goals, profile] = await Promise.all([getUserGoals(userId), getLearningProfile(userId)]);
  return buildStaticPlan(goals, profile);
}

async function generateStudySession({ userId, minutes }) {
  const [profile, preferences] = await Promise.all([
    getLearningProfile(userId),
    getUserPreferences(userId)
  ]);
  return buildStudySessionWithPreferences({ profile, minutes, preferences });
}

async function getAiStatus(userId) {
  await getLearningProfile(userId);
  return {
    mode: config.openAiApiKey ? "live" : "demo",
    model: config.openAiModel,
    online: true,
    dailyLimit: config.aiDailyMessageLimit
  };
}

async function generateMockTest({ userId, topic, difficulty, timeLimit }) {
  const profile = await getLearningProfile(userId);
  const weakTopic = Object.entries(profile.concept_mastery || {}).sort((a, b) => Number(a[1]) - Number(b[1]))[0]?.[0] || "orbital_mechanics";
  const chosenTopic = topic || weakTopic;

  if (!config.openAiApiKey) {
    return buildFallbackMockTest(chosenTopic, difficulty, timeLimit);
  }

  try {
    const prompt = `Genereaza un test ONAA in JSON cu 3 intrebari originale pentru topicul ${chosenTopic}, dificultatea ${difficulty}, timpul ${timeLimit} minute. Formatul trebuie sa fie {"title":"","difficulty":"","timeLimit":0,"questions":[{"id":"","prompt":"","answerType":"text"}]}. Raspunde strict cu JSON valid.`;
    const response = await callOpenAIResponses({
      input: [{ role: "user", content: [{ type: "input_text", text: prompt }] }],
      stream: false
    });
    const json = await response.json();
    const parsed = extractJson(extractResponseText(json));
    if (!parsed?.questions?.length) throw new Error("Mock test AI invalid.");
    return parsed;
  } catch {
    return buildFallbackMockTest(chosenTopic, difficulty, timeLimit);
  }
}

async function analyzeMockTest({ userId, test, answers }) {
  const profile = await getLearningProfile(userId);
  const weakest = Object.entries(profile.concept_mastery || {}).sort((a, b) => Number(a[1]) - Number(b[1])).map(([key]) => key);

  if (!config.openAiApiKey) {
    const fallbackProblems =
      weakest.flatMap((topic) => remediationTemplates[topic] || []).slice(0, 3);
    return {
      summary: "Vad ca ai nevoie de mai multa siguranta pe mecanica orbitala si pe formularea raspunsurilor. Hai sa recapitulam calm ideile-cheie.",
      remediationProblems: fallbackProblems.length
        ? fallbackProblems
        : remediationTemplates.orbital_mechanics.slice(0, 3),
      worksheet: ["Rescrie cele trei legi ale lui Kepler.", "Fa o problema de magnitudini si una de constelatii."]
    };
  }

  try {
    const prompt = `Analizeaza in romana raspunsurile elevului la acest mock test si intoarce JSON {"summary":"","remediationProblems":[],"worksheet":[]}. Test: ${JSON.stringify(test)}. Raspunsuri: ${JSON.stringify(answers)}. Raspunde strict cu JSON valid.`;
    const response = await callOpenAIResponses({
      input: [{ role: "user", content: [{ type: "input_text", text: prompt }] }],
      stream: false
    });
    const json = await response.json();
    const analysis = extractJson(extractResponseText(json));
    const progressionReward = await awardMockTestXp({
      userId,
      difficulty: test?.difficulty || "advanced",
      answerCount: answers.length
    });
    return { ...analysis, progressionReward };
  } catch {
    const fallbackProblems =
      weakest.flatMap((topic) => remediationTemplates[topic] || []).slice(0, 3);
    const progressionReward = await awardMockTestXp({
      userId,
      difficulty: test?.difficulty || "advanced",
      answerCount: answers.length
    });
    return {
      summary: "AI-ul nu a putut produce analiza completa, dar ti-am pregatit o recapitulare utila pe punctele cele mai slabe.",
      remediationProblems: fallbackProblems.length
        ? fallbackProblems
        : remediationTemplates.orbital_mechanics.slice(0, 3),
      worksheet: [
        "Rescrie pasii de rezolvare pentru fiecare intrebare.",
        "Verifica unitatile si formulele folosite.",
        "Refa problema cea mai slaba fara a te uita la raspuns."
      ],
      progressionReward
    };
  }
}

async function streamTutorConversation({ userId, sessionId, message, topicTag, imageDataUrl, response }) {
  await enforceDailyRateLimit(userId);

  const [goals, profile] = await Promise.all([getUserGoals(userId), getLearningProfile(userId)]);
  const detectedTopic = detectTopic(message, topicTag);
  const history = await getConversationHistory(userId, sessionId, detectedTopic);
  const historySummary = summarizeHistory(history);
  const mathChecks = analyzeMathMessage(message);
  const curatedSnippet = curatedTopicLibrary[detectedTopic] ? JSON.stringify(curatedTopicLibrary[detectedTopic]) : "";

  const nextProfile = {
    ...profile,
    concept_mastery: {
      ...(profile.concept_mastery || {}),
      [detectedTopic]: Math.min(1, Number((profile.concept_mastery || {})[detectedTopic] || 0.2) + 0.03)
    },
    learning_style: detectLearningStyle(message),
    common_mistakes: [
      ...new Set([
        ...((profile.common_mistakes || []).slice(-4)),
        ...(mathChecks.some((item) => !item.isCorrect) ? ["arithmetic_step"] : [])
      ])
    ],
    conversation_context: historySummary || profile.conversation_context || "",
    last_session_summary: message.slice(0, 240)
  };
  await saveLearningProfile(userId, nextProfile);
  await storeConversationMessage({ userId, sessionId, role: "user", content: message, topicTag: detectedTopic, tokensUsed: approximateTokens(message) });

  response.setHeader("Content-Type", "text/event-stream");
  response.setHeader("Cache-Control", "no-cache, no-transform");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders?.();
  response.write(`data: ${JSON.stringify({ type: "meta", topic: detectedTopic, mathChecks })}\n\n`);

  const contentHash = hashContent(`${detectedTopic}|${nextProfile.learning_style}|${message.toLowerCase().trim()}`);
  const cached = await findCachedContent(contentHash);
  let finalText = "";
  let usage = { input_tokens: 0, output_tokens: 0 };

  if (cached) {
    finalText = cached.generated_content.text || "";
    await streamTextChunks(response, finalText);
  } else if (!config.openAiApiKey) {
    finalText = buildFallbackTutorReply({ topicTag: detectedTopic, profile: nextProfile, goals, mathChecks });
    await streamTextChunks(response, finalText);
    await upsertCachedContent({ contentType: "explanation", topic: detectedTopic, difficulty: "adaptive", contentHash, generatedContent: { text: finalText, source: "demo" } });
  } else {
    const input = [
      { role: "system", content: [{ type: "input_text", text: buildSystemPrompt({ profile: nextProfile, goals, topicTag: detectedTopic, summary: historySummary, mathChecks, curatedSnippet }) }] },
      ...history.map((item) => ({ role: item.role, content: [{ type: "input_text", text: item.content }] })),
      { role: "user", content: [{ type: "input_text", text: message }, ...(imageDataUrl ? [{ type: "input_image", image_url: imageDataUrl, detail: "auto" }] : [])] }
    ];

    const openAiStream = await callOpenAIResponses({ input, stream: true });
    const decoder = new TextDecoder();
    let buffer = "";

    for await (const chunk of openAiStream.body) {
      buffer += decoder.decode(chunk, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() || "";

      for (const part of parts) {
        const lines = part.split("\n").filter(Boolean);
        const eventName = lines.find((line) => line.startsWith("event:"))?.replace("event:", "").trim() || "message";
        const rawData = lines.find((line) => line.startsWith("data:"))?.replace("data:", "").trim();
        if (!rawData || rawData === "[DONE]") continue;

        const parsed = JSON.parse(rawData);
        if (eventName === "response.output_text.delta" && parsed.delta) {
          finalText += parsed.delta;
          response.write(`data: ${JSON.stringify({ type: "delta", delta: parsed.delta })}\n\n`);
        }
        if (eventName === "response.completed") {
          usage = parsed.response?.usage || usage;
        }
        if (eventName === "response.error") {
          throw new Error(parsed.error?.message || "OpenAI streaming failed.");
        }
      }
    }

    await upsertCachedContent({ contentType: "explanation", topic: detectedTopic, difficulty: "adaptive", contentHash, generatedContent: { text: finalText, source: "openai" } });
  }

  response.write(`data: ${JSON.stringify({ type: "done", usage })}\n\n`);
  await storeConversationMessage({ userId, sessionId, role: "assistant", content: finalText, topicTag: detectedTopic, tokensUsed: usage.input_tokens + usage.output_tokens });
  response.end();
}

module.exports = {
  analyzeMathMessage,
  analyzeMockTest,
  buildLibraryRecommendations,
  generateGoalPlan,
  generateStudySession,
  generateMockTest,
  getAiStatus,
  getLearningProfile,
  getUserGoals,
  listSavedExplanations,
  saveExplanation,
  streamTutorConversation,
  upsertUserGoals
};
