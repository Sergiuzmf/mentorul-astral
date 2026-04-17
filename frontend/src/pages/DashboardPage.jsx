import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { dashboardHighlights } from "../data/onaaContent.js";

export function DashboardPage() {
  const { token, user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    async function load() {
      const [profileResponse, statusResponse, planResponse] = await Promise.all([
        apiRequest("/api/profile", { token }),
        apiRequest("/api/ai/status", { token }),
        apiRequest("/api/ai/plan", { method: "POST", token, body: {} })
      ]);
      setProfileData(profileResponse);
      setAiStatus(statusResponse);
      setPlan(planResponse.plan);
    }

    load().catch(console.error);
  }, [token]);

  const daysUntilMarch = Math.max(
    0,
    Math.ceil((new Date(`${user?.targetYear || new Date().getFullYear()}-03-15`).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
  );

  const progression = profileData?.progression;
  const levelProgress = progression
    ? Math.max(
        0,
        Math.min(
          100,
          ((progression.totalXp - progression.currentLevelBaseXp) /
            Math.max(1, progression.nextLevelXp - progression.currentLevelBaseXp)) *
            100
        )
      )
    : 0;

  return (
    <div className="page-stack">
      <section className="hero-card">
        <div>
          <p className="eyebrow">First AI-powered olympiad prep platform in Romania</p>
          <h1>Mentorul Astral</h1>
          <p>
            AI-ul te ajuta sa inveti, sa iti verifici calculele si sa iti adaptezi
            ritmul zilnic. Verifica mereu si materialele oficiale ONAA.
          </p>
        </div>
        <div className="hero-badge">
          <span className={`ai-indicator ${aiStatus?.online ? "live" : "offline"}`}>
            {aiStatus?.mode === "live" ? "AI online" : "AI demo"}
          </span>
          <span>{daysUntilMarch} zile pana la martie</span>
          <span>{profileData?.goals?.dailyMinutes || 60} min azi</span>
        </div>
      </section>

      <section className="stats-grid">
        {dashboardHighlights.map((item) => (
          <article className="stat-card" key={item.label}>
            <p className="metric-label">{item.label}</p>
            <h2>{item.value}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </section>

      {progression ? (
        <section className="content-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Nivelul tau</p>
              <h2>XP, rang si progres pana la urmatorul nivel</h2>
            </div>
          </div>
          <div className="module-grid">
            <article className="module-card floating-card">
              <h3>Nivel {progression.level}</h3>
              <p>{progression.title}</p>
              <p>{progression.totalXp} XP total</p>
            </article>
            <article className="module-card floating-card">
              <h3>Minute studiate</h3>
              <p>{progression.totalMinutesCompleted} minute completate</p>
              <p>{progression.sessionsCompleted} sesiuni finalizate</p>
            </article>
            <article className="module-card floating-card">
              <h3>Mock tests</h3>
              <p>{progression.mockTestsCompleted} teste analizate</p>
              <p>Fiecare test bun iti aduce XP suplimentar.</p>
            </article>
          </div>
          <div className="xp-bar">
            <div className="xp-bar-fill" style={{ width: `${levelProgress}%` }} />
          </div>
          <p className="muted-copy">
            Urmatorul nivel la {progression.nextLevelXp} XP.
          </p>
        </section>
      ) : null}

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Daily Goal Widget</p>
            <h2>Planul AI pentru azi</h2>
          </div>
        </div>

        {plan ? (
          <div className="stack-sm">
            <h3>{plan.title}</h3>
            <p>{plan.coachMessage}</p>
            <ul className="clean-list">
              {plan.sections.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Se incarca planul personalizat...</p>
        )}
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Leaderboard</p>
            <h2>Cei mai activi exploratori ai platformei</h2>
          </div>
        </div>
        <div className="leaderboard-list">
          {(profileData?.leaderboard || []).map((entry) => (
            <article className="leaderboard-row" key={`${entry.rank}-${entry.user}`}>
              <strong>#{entry.rank}</strong>
              <span>{entry.user}</span>
              <span>Nivel {entry.level}</span>
              <span>{entry.totalXp} XP</span>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Learning Profile</p>
            <h2>Modelul tau de invatare</h2>
          </div>
        </div>
        {profileData ? (
          <div className="module-grid">
            <article className="module-card">
              <h3>Stil detectat</h3>
              <p>{profileData.profile.learningStyle}</p>
            </article>
            <article className="module-card">
              <h3>Ritm preferat</h3>
              <p>{profileData.profile.preferredPace}</p>
            </article>
            <article className="module-card">
              <h3>Ultima sesiune</h3>
              <p>{profileData.profile.lastSessionSummary || "Nu exista inca un rezumat."}</p>
            </article>
            <article className="module-card">
              <h3>Greseli frecvente</h3>
              <p>
                {profileData.profile.commonMistakes.length
                  ? profileData.profile.commonMistakes.join(", ")
                  : "AI-ul nu a detectat inca tipare de eroare."}
              </p>
            </article>
          </div>
        ) : null}
      </section>
    </div>
  );
}
