import { useState } from "react";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { mockPresets } from "../data/onaaContent.js";
import { MarkdownContent } from "../components/MarkdownContent.jsx";

export function MockTestsPage() {
  const { token } = useAuth();
  const [topic, setTopic] = useState("orbital_mechanics");
  const [difficulty, setDifficulty] = useState("advanced");
  const [timeLimit, setTimeLimit] = useState(90);
  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  async function generateTest() {
    setIsGenerating(true);
    setError("");

    try {
      const response = await apiRequest("/api/ai/mock-tests/generate", {
        method: "POST",
        token,
        body: { topic, difficulty, timeLimit }
      });
      setTest(response.test);
      setAnswers({});
      setAnalysis(null);
    } catch (requestError) {
      setError(requestError.message || "Nu am putut genera testul.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function analyzeTest() {
    if (!test) return;
    setIsAnalyzing(true);
    setError("");

    try {
      const response = await apiRequest("/api/ai/mock-tests/analyze", {
        method: "POST",
        token,
        body: {
          test,
          answers: Object.entries(answers).map(([questionId, answer]) => ({ questionId, answer }))
        }
      });
      setAnalysis(response.analysis);
    } catch (requestError) {
      setError(requestError.message || "Nu am putut analiza testul.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="page-stack">
      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Adaptive Mock Tests</p>
            <h1>Teste generate dinamic</h1>
          </div>
        </div>

        <div className="settings-grid">
          <label>
            Topic
            <select value={topic} onChange={(event) => setTopic(event.target.value)}>
              <option value="orbital_mechanics">Mecanica orbitala</option>
              <option value="stellar_physics">Fizica stelara</option>
              <option value="magnitude_scale">Magnitudini</option>
              <option value="constellations">Constelatii</option>
            </select>
          </label>

          <label>
            Dificultate
            <select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </label>

          <label>
            Timp (minute)
            <input type="number" value={timeLimit} onChange={(event) => setTimeLimit(Number(event.target.value))} />
          </label>
        </div>

        <div className="chip-row">
          {mockPresets.map((preset) => (
            <button
              key={preset.label}
              className="ghost-button"
              type="button"
              onClick={() => {
                setTimeLimit(preset.minutes);
                setDifficulty(preset.difficulty);
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="button" onClick={generateTest} disabled={isGenerating}>
          {isGenerating ? "Se genereaza..." : "Genereaza test AI"}
        </button>
      </section>

      {test ? (
        <section className="content-card">
          <h2>{test.title}</h2>
          <p>
            Dificultate: {test.difficulty} {"\u00B7"} {test.timeLimit} minute
          </p>
          <div className="stack-sm">
            {test.questions.map((question, index) => (
              <article className="module-card" key={question.id}>
                <h3>
                  {index + 1}. {question.prompt}
                </h3>
                <textarea
                  rows="4"
                  value={answers[question.id] || ""}
                  onChange={(event) =>
                    setAnswers((current) => ({ ...current, [question.id]: event.target.value }))
                  }
                />
              </article>
            ))}
          </div>
          <button className="primary-button" type="button" onClick={analyzeTest} disabled={isAnalyzing}>
            {isAnalyzing ? "Se analizeaza..." : "Analizeaza testul"}
          </button>
        </section>
      ) : null}

      {analysis ? (
        <section className="content-card">
          <h2>Analiza AI</h2>
          <MarkdownContent content={analysis.summary} />
          {analysis.progressionReward ? (
            <p className="progress-reward">
              Ai castigat <strong>{analysis.progressionReward.xpAwarded} XP</strong> pentru acest mock test.
              Nivel curent: <strong>{analysis.progressionReward.progression.level}</strong> - {analysis.progressionReward.progression.title}.
            </p>
          ) : null}
          <div className="module-grid">
            <article className="module-card">
              <h3>Probleme de remediere</h3>
              <ul className="clean-list">
                {(analysis.remediationProblems || []).map((item) => (
                  <li key={typeof item === "string" ? item : JSON.stringify(item)}>
                    {typeof item === "string" ? item : item.description || item.problemId}
                  </li>
                ))}
              </ul>
            </article>
            <article className="module-card">
              <h3>Fisa de lucru</h3>
              <ul className="clean-list">
                {(analysis.worksheet || []).map((item) => (
                  <li key={typeof item === "string" ? item : JSON.stringify(item)}>
                    {typeof item === "string" ? item : item.feedback || item.correctAnswer}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>
      ) : null}
    </div>
  );
}
