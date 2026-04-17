import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { academyDurations, aiTutorName } from "../data/learningExperience.js";

export function StudyAreaPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [selectedMinutes, setSelectedMinutes] = useState(45);
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preferencesMeta, setPreferencesMeta] = useState({ mathTopics: [], studyTracks: [] });
  const [preferences, setPreferences] = useState({
    lastMathTopic: "Algebra de baza",
    selectedTracks: ["astrophysics", "astronomy"]
  });
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    async function loadPreferences() {
      const response = await apiRequest("/api/preferences", { token });
      setPreferences(response.preferences);
      setPreferencesMeta({
        mathTopics: response.mathTopics,
        studyTracks: response.studyTracks
      });
    }

    loadPreferences().catch(() => undefined);
  }, [token]);

  useEffect(() => {
    async function loadSession() {
      setIsLoading(true);
      const response = await apiRequest("/api/ai/study-session", {
        method: "POST",
        token,
        body: { minutes: selectedMinutes }
      });
      setSession(response.session);
      setIsLoading(false);
    }

    loadSession().catch(() => setIsLoading(false));
  }, [selectedMinutes, token, preferences]);

  async function savePreferences() {
    const response = await apiRequest("/api/preferences", {
      method: "PUT",
      token,
      body: preferences
    });
    setPreferences(response.preferences);
    setSaveMessage("Preferintele de invatare au fost salvate.");
  }

  function toggleTrack(trackId) {
    setPreferences((current) => {
      const exists = current.selectedTracks.includes(trackId);
      return {
        ...current,
        selectedTracks: exists
          ? current.selectedTracks.filter((item) => item !== trackId)
          : [...current.selectedTracks, trackId]
      };
    });
  }

  function startGuidedSession() {
    if (!session) return;
    navigate("/tutor", {
      state: {
        initialPrompt: session.openingPrompt,
        initialTopic: session.topic,
        plannedSession: {
          minutes: selectedMinutes,
          topic: session.topic,
          title: session.title
        }
      }
    });
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card-animated">
        <div>
          <p className="eyebrow">Academia ONAA</p>
          <h1>Invatarea de azi, condusa de AI</h1>
          <p>
            Alege timpul pe care il ai si domeniile pe care vrei sa le aprofundezi. {aiTutorName}
            leaga matematica, fizica, astrofizica si astronomia intr-o singura experienta.
          </p>
        </div>
        <div className="hero-badge">
          <span>Sesiuni adaptive</span>
          <span>Lectii interdisciplinare</span>
          <span>Start rapid</span>
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Profil academic</p>
            <h2>De unde pornim cu matematica si materiile</h2>
          </div>
        </div>

        <div className="settings-grid">
          <label>
            Ultimul subiect de matematica pe care il stii cat de cat
            <select
              value={preferences.lastMathTopic}
              onChange={(event) =>
                setPreferences((current) => ({ ...current, lastMathTopic: event.target.value }))
              }
            >
              {preferencesMeta.mathTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="chip-row">
          {preferencesMeta.studyTracks.map((track) => (
            <button
              key={track.id}
              className={`ghost-button ${preferences.selectedTracks.includes(track.id) ? "is-selected" : ""}`}
              type="button"
              onClick={() => toggleTrack(track.id)}
            >
              {track.label}
            </button>
          ))}
        </div>

        <div className="session-cta-row">
          <button className="primary-button" type="button" onClick={savePreferences}>
            Salveaza traseul de invatare
          </button>
          {saveMessage ? <p className="muted-copy">{saveMessage}</p> : null}
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Cat timp ai azi?</p>
            <h2>Alege durata sesiunii</h2>
          </div>
        </div>

        <div className="chip-row">
          {academyDurations.map((minutes) => (
            <button
              key={minutes}
              className={`ghost-button ${selectedMinutes === minutes ? "is-selected" : ""}`}
              type="button"
              onClick={() => setSelectedMinutes(minutes)}
            >
              {minutes} min
            </button>
          ))}
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Sugestia AI pentru azi</p>
            <h2>{session?.title || "Se pregateste lectia..."}</h2>
          </div>
        </div>

        {isLoading ? (
          <p>AI-ul pregateste o propunere de studiu pe baza progresului tau...</p>
        ) : session ? (
          <div className="study-session-layout">
            <article className="module-card floating-card">
              <h3>De ce asta azi?</h3>
              <p>{session.reason}</p>
            </article>

            <article className="module-card floating-card">
              <h3>Ce obtii din sesiune</h3>
              <ul className="clean-list">
                {session.goals.map((goal) => (
                  <li key={goal}>{goal}</li>
                ))}
              </ul>
            </article>
          </div>
        ) : (
          <p>Nu am putut genera sugestia de studiu.</p>
        )}

        {session ? (
          <div className="session-cta-row">
            <button className="primary-button" type="button" onClick={startGuidedSession}>
              Incepe lectia cu {aiTutorName}
            </button>
            <p className="muted-copy">{session.nextResourceHint}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

