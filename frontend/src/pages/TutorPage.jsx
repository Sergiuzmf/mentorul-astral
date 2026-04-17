import { useState } from "react";
import { useLocation } from "react-router-dom";
import { AIChatPanel } from "../components/AIChatPanel.jsx";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export function TutorPage() {
  const location = useLocation();
  const { token } = useAuth();
  const plannedSession = location.state?.plannedSession || null;
  const [reward, setReward] = useState(null);
  const [isCompleting, setIsCompleting] = useState(false);

  async function completeSession() {
    if (!plannedSession || isCompleting) return;
    setIsCompleting(true);
    try {
      const response = await apiRequest("/api/progression/study-complete", {
        method: "POST",
        token,
        body: {
          minutes: plannedSession.minutes,
          topic: plannedSession.topic
        }
      });
      setReward(response);
    } finally {
      setIsCompleting(false);
    }
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card-animated">
        <div>
          <p className="eyebrow">Mentorul Astral</p>
          <h1>Profesorul tau AI, intr-o fereastra mare</h1>
          <p>
            Aici lucrezi pe larg cu AI-ul: lectii, explicatii de formule, verificarea pasilor de calcul
            si sesiuni ghidate pentru timpul pe care il ai azi.
          </p>
        </div>
        <div className="hero-badge">
          <span>Dialog socratic</span>
          <span>LaTeX + calcule</span>
          <span>Suport pe imagini</span>
        </div>
      </section>

      {plannedSession ? (
        <section className="content-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Sesiune activa</p>
              <h2>{plannedSession.title}</h2>
            </div>
          </div>
          <p>
            Dupa ce termini lectia ghidata, marcheaz-o ca finalizata ca sa primesti XP pentru minutele
            lucrate si pentru cursul parcurs.
          </p>
          <button className="primary-button" type="button" onClick={completeSession} disabled={isCompleting || Boolean(reward)}>
            {reward ? "Sesiune marcata" : isCompleting ? "Se salveaza..." : "Finalizeaza sesiunea si primeste XP"}
          </button>
          {reward ? (
            <p className="muted-copy">
              Ai primit <strong>{reward.xpAwarded} XP</strong>. Nivel curent: <strong>{reward.progression.level}</strong>
              {" "} - {reward.progression.title}.
            </p>
          ) : null}
        </section>
      ) : null}

      <AIChatPanel className="tutor-page-panel" />
    </div>
  );
}
