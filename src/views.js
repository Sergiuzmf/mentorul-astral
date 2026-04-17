import {
  achievements,
  flashcards,
  forumTopics,
  navigation,
  modules,
  originalProblems,
  resources,
  weeklyChallenges
} from "./content.js";
import { buildProgressBar, escapeHtml, formatMinutes, percent } from "./utils.js";
import { computeReadinessScore, getNextRankThreshold, getRank, getUnlockedAchievements } from "./state.js";

function renderMetric(title, value, caption) {
  return `<article class="metric"><div class="muted">${title}</div><div class="value">${value}</div><div class="small-copy">${caption}</div></article>`;
}

export function renderNav(activeRoute) {
  return navigation
    .map((item) => `<a class="nav-link ${activeRoute === item.id ? "active" : ""}" href="#/${item.id}">${item.label}</a>`)
    .join("");
}

export function syncSidebar(state) {
  document.getElementById("xp-rank").textContent = getRank(state.xp);
  document.getElementById("xp-total").textContent = `${state.xp} XP`;
  const threshold = getNextRankThreshold(state.xp);
  document.getElementById("xp-fill").style.width = `${Math.min(100, (state.xp / threshold) * 100)}%`;
}

export function dashboardView(state) {
  const unlocked = getUnlockedAchievements(state);
  const readiness = computeReadinessScore(state);
  return `
    <section class="hero">
      <div>
        <p class="eyebrow">Obiectiv</p>
        <h3>Pregatire constanta pentru ONAA, 60 de minute pe zi</h3>
        <p class="muted">Platforma combina teorie, probleme si recall rapid pentru sectiunea Seniori, cu accent pe mecanica cereasca, fizica stelara si analiza de date.</p>
        <div class="tag-row">
          <span class="tag">12 luni de curriculum</span>
          <span class="tag">3 ore la etapa judeteana</span>
          <span class="tag">Teorie + analiza de date + harta muta</span>
        </div>
      </div>
      <div class="panel">
        <div class="space-between">
          <h3>Fisa rapida</h3>
          <span class="pill ${readiness >= 80 ? "success" : readiness >= 60 ? "warning" : "danger"}">Readiness ${readiness}</span>
        </div>
        <div class="check-list">
          <div class="callout">Fizica standard de liceu nu este suficienta pentru ONAA. Planul include extensii reale de nivel olimpic.</div>
          <div class="callout">Daca o zona scade sub 60%, sistemul te trimite inapoi spre prerechizite.</div>
        </div>
      </div>
    </section>
    <section class="stats-grid">
      ${renderMetric("Streak curent", `${state.streak} zile`, "Continuitatea bate sesiunile maraton.")}
      ${renderMetric("Sesiuni finalizate", `${state.completedSessions}`, "Fiecare sesiune are 60 minute fixe.")}
      ${renderMetric("Probleme rezolvate", `${state.completedProblemIds.length}`, "Originale si inspirate de formatul ONAA.")}
      ${renderMetric("Percentila benchmark", `${state.benchmarkPercentile}%`, "Comparatie anonima simulata.")}
    </section>
    <section class="split">
      <section class="panel">
        <div class="space-between"><h3>Progres pe domenii</h3><span class="small-copy">Zone de lucru</span></div>
        <div class="module-list">
          <div class="module-item"><div class="module-meta"><strong>Mecanica & orbite</strong><span>${percent(state.weakAreas.mechanics)}</span></div>${buildProgressBar(state.weakAreas.mechanics)}</div>
          <div class="module-item"><div class="module-meta"><strong>Fizica stelara</strong><span>${percent(state.weakAreas.stellar)}</span></div>${buildProgressBar(state.weakAreas.stellar)}</div>
          <div class="module-item"><div class="module-meta"><strong>Observatie & navigatie</strong><span>${percent(state.weakAreas.observation)}</span></div>${buildProgressBar(state.weakAreas.observation)}</div>
          <div class="module-item"><div class="module-meta"><strong>Analiza de date</strong><span>${percent(state.weakAreas.data)}</span></div>${buildProgressBar(state.weakAreas.data)}</div>
        </div>
      </section>
      <section class="panel">
        <div class="space-between"><h3>Badge-uri obtinute</h3><span class="small-copy">${unlocked.length}/${achievements.length}</span></div>
        <div class="achievement-list">
          ${unlocked
            .map((achievement) => `<article class="achievement-item"><div class="module-meta"><h4>${achievement.title}</h4><span class="pill success">+${achievement.xp} XP</span></div><p class="muted">${achievement.description}</p></article>`)
            .join("")}
        </div>
      </section>
    </section>
    <section class="cards-grid">
      <article class="card">
        <h3>Calendar studiu</h3>
        <div class="calendar">
          ${Array.from({ length: 28 }, (_, index) => {
            const day = index + 1;
            return `<div class="calendar-day ${state.studyCalendar.includes(day) ? "done" : ""}">${day}</div>`;
          }).join("")}
        </div>
      </article>
      <article class="card">
        <h3>Ultimele sesiuni</h3>
        <div class="session-list">
          ${state.sessionHistory
            .slice(0, 4)
            .map((session) => `<div class="session-item"><div class="session-step"><strong>${session.focus}</strong><span>${session.score}%</span></div><div class="small-copy">${session.date}</div></div>`)
            .join("")}
        </div>
      </article>
      <article class="card">
        <h3>Provocari saptamanale</h3>
        <div class="session-list">
          ${weeklyChallenges
            .map((challenge) => `<div class="session-item"><h4>${challenge.title}</h4><p class="muted">${challenge.description}</p><span class="pill">${challenge.reward}</span></div>`)
            .join("")}
        </div>
      </article>
    </section>
  `;
}

export function curriculumView(state) {
  return `<section class="panel"><h3>Curriculum progresiv pe 12 luni</h3><p class="muted">Modulele construiesc treptat intuitie fizica, tehnica de calcul si viteza de concurs.</p><div class="module-list">${modules
    .map((module) => {
      const progress = state.moduleProgress[module.id] || 0;
      return `<article class="module-item"><div class="module-meta"><div><span class="eyebrow">${module.month}</span><h4>${module.title}</h4></div><span class="pill">${module.duration}</span></div><p class="muted">${module.focus}</p><p class="small-copy"><strong>Prerechizite:</strong> ${module.prerequisites}</p><div class="module-meta"><span>Progres</span><span>${percent(progress)}</span></div>${buildProgressBar(progress)}</article>`;
    })
    .join("")}</div></section>`;
}

export function dailyView(state) {
  const needsReview = Object.values(state.weakAreas).some((score) => score < 60);
  return `
    <section class="split">
      <section class="panel">
        <div class="space-between"><h3>Sesiune zilnica de 60 minute</h3><span class="pill ${needsReview ? "warning" : "success"}">${needsReview ? "Review activ" : "Ritm bun"}</span></div>
        <div class="session-list">
          <article class="session-item"><div class="session-step"><h4>1. Teorie - 15 minute</h4><span>Concepte cheie</span></div><p class="muted">Astazi: energia specifica, ecuatia vis-viva, interpretarea diagramei HR.</p><div class="formula-box">v² = μ(2/r - 1/a)<br />L = 4πR²σT⁴</div></article>
          <article class="session-item"><div class="session-step"><h4>2. Probleme - 30 minute</h4><span>2-3 exercitii</span></div><p class="muted">Set recomandat: p5, p15 si p21.</p></article>
          <article class="session-item"><div class="session-step"><h4>3. Recall - 15 minute</h4><span>Flashcards</span></div><p class="muted">Constante, formule orbitale, clase spectrale, conditii de circumpolaritate.</p></article>
        </div>
        ${needsReview ? `<div class="callout">Scoruri sub 60 detectate. Recomandare automata: revino la modulele 3, 4 si 10 inainte de a continua cu probleme Master.</div>` : ""}
        <button class="primary-button" type="button" data-action="complete-session">Marcheaza sesiunea de azi ca finalizata</button>
      </section>
      <section class="panel">
        <h3>Pachet flashcards</h3>
        <div class="flashcard-grid">
          ${flashcards
            .slice(0, 8)
            .map((card) => `<article class="module-item"><h4>${card.front}</h4><p class="small-copy">${card.back}</p></article>`)
            .join("")}
        </div>
      </section>
    </section>
  `;
}

export function problemsView(state) {
  const solved = new Set(state.completedProblemIds);
  return `
    <section class="panel">
      <div class="space-between"><h3>Banca de probleme ONAA-style</h3><span class="small-copy">${originalProblems.length} probleme originale cu solutii</span></div>
      <div class="filters">
        <select id="problem-level-filter">
          <option value="all">Toate nivelurile</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
          <option value="Master">Master</option>
        </select>
        <select id="problem-topic-filter">
          <option value="all">Toate temele</option>
          <option value="orbits">Orbite</option>
          <option value="stellar">Fizica stelara</option>
          <option value="observation">Observational</option>
          <option value="navigation">Navigatie</option>
          <option value="data">Analiza de date</option>
          <option value="rockets">Rachete</option>
        </select>
      </div>
      <div class="problem-list" id="problem-list">${renderProblemCards(originalProblems, solved)}</div>
    </section>
  `;
}

export function renderProblemCards(problems, solvedSet) {
  return problems
    .map(
      (problem) => `
        <article class="problem-item" data-problem-id="${problem.id}" data-level="${problem.level}" data-topic="${problem.topic}">
          <div class="module-meta">
            <div><span class="eyebrow">${problem.category}</span><h4>${problem.title}</h4></div>
            <div class="tag-row">
              <span class="pill">${problem.level}</span>
              <span class="pill">${formatMinutes(problem.estimatedMinutes)}</span>
              ${solvedSet.has(problem.id) ? `<span class="pill success">Rezolvata</span>` : ""}
            </div>
          </div>
          <p>${escapeHtml(problem.prompt)}</p>
          <div class="formula-box">${escapeHtml(problem.formula)}</div>
          <div class="solution-box"><strong>Solutie:</strong> ${escapeHtml(problem.solution)}</div>
          <button class="ghost-button" type="button" data-action="solve-problem" data-problem-id="${problem.id}">Marcheaza ca rezolvata</button>
        </article>
      `
    )
    .join("");
}

export function simulatorView(state) {
  const average = state.simulatorAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / state.simulatorAttempts.length;
  return `
    <section class="split">
      <section class="panel">
        <h3>Simulator etapa judeteana</h3>
        <p class="muted">Format inspirat de regulamentul oficial: 3 ore, trei subiecte, parte teoretica si analiza de date / simulare a cerului pe hartie.</p>
        <div class="module-list">
          <div class="module-item"><h4>Subiectul I</h4><p class="muted">Itemi rapizi si semiobiectivi pentru verificarea bazei teoretice.</p></div>
          <div class="module-item"><h4>Subiectul II</h4><p class="muted">Probleme scurte de calcul: legile lui Kepler, magnitudini, instrumente.</p></div>
          <div class="module-item"><h4>Subiectul III</h4><p class="muted">Problema lunga sau analiza de date cu interpretare argumentata.</p></div>
        </div>
        <button class="primary-button" type="button" data-action="start-simulator">Porneste o simulare de 3 ore</button>
      </section>
      <section class="panel">
        <div class="space-between"><h3>Istoric simulari</h3><span class="pill ${average >= 80 ? "success" : average >= 60 ? "warning" : "danger"}">${Math.round(average)}% medie</span></div>
        <div class="session-list">
          ${state.simulatorAttempts
            .map((attempt) => `<article class="session-item"><div class="session-step"><h4>${attempt.date}</h4><span>${attempt.score}%</span></div><p class="muted">${attempt.comment}</p></article>`)
            .join("")}
        </div>
      </section>
    </section>
  `;
}

export function resourcesView() {
  return `
    <section class="resource-grid">
      <article class="panel">
        <h3>Biblioteca de resurse</h3>
        <div class="resource-list">
          ${resources
            .map((resource) => `<article class="resource-item"><div class="resource-meta"><h4>${resource.title}</h4><span class="pill">${resource.type}</span></div><p class="muted">${resource.description}</p><p class="small-copy">${resource.note}</p><a href="${resource.link}" target="_blank" rel="noreferrer">Deschide resursa</a></article>`)
            .join("")}
        </div>
      </article>
      <article class="panel">
        <h3>Generator de formula sheet</h3>
        <p class="muted">Selectie rapida de formule pentru recapitulare.</p>
        <div class="formula-box">Orbite: T = 2π sqrt(a^3/μ), v = sqrt(μ(2/r - 1/a)), Δv = ve ln(m0/mf)<br />Fotometrie: m - M = 5 log10(d/10 pc), F1/F2 = 10^((m2 - m1)/2.5)<br />Stele: L = 4πR²σT⁴, λmax T = b</div>
        <p class="small-copy">In versiunea cu backend, aceasta sectiune poate exporta PDF personalizat.</p>
      </article>
    </section>
  `;
}

export function toolsView() {
  return `
    <section class="calculator-grid">
      <article class="panel">
        <h3>Calculator orbital</h3>
        <form id="orbit-form" class="inline-form">
          <label>Semiaxa mare a (km)<input name="semiMajorAxis" type="number" step="any" value="6771" /></label>
          <label>μ (km^3/s^2)<input name="mu" type="number" step="any" value="398600" /></label>
          <button class="primary-button" type="submit">Calculeaza perioada</button>
        </form>
        <div class="tool-output" id="orbit-output">Completeaza campurile pentru a vedea perioada orbitala.</div>
      </article>
      <article class="panel">
        <h3>Calculator magnitudine</h3>
        <form id="magnitude-form" class="inline-form">
          <label>m1<input name="m1" type="number" step="any" value="2" /></label>
          <label>m2<input name="m2" type="number" step="any" value="5" /></label>
          <button class="primary-button" type="submit">Raport de stralucire</button>
        </form>
        <div class="tool-output" id="magnitude-output">Formula folosita: F1/F2 = 10^((m2 - m1)/2.5).</div>
      </article>
      <article class="panel">
        <h3>Calculator ecuatia rachetei</h3>
        <form id="rocket-form" class="inline-form">
          <label>ve (m/s)<input name="ve" type="number" step="any" value="3100" /></label>
          <label>m0<input name="m0" type="number" step="any" value="4000" /></label>
          <label>mf<input name="mf" type="number" step="any" value="1000" /></label>
          <button class="primary-button" type="submit">Calculeaza delta-v</button>
        </form>
        <div class="tool-output" id="rocket-output">Delta-v va aparea aici.</div>
      </article>
      <article class="panel">
        <h3>Observator virtual</h3>
        <p class="muted">Placeholder didactic pentru integrare ulterioara cu seturi de date reale, sky maps sau arhive publice.</p>
        <div class="quote-box">Sugestii de integrare: Stellarium Web, AAVSO pentru stele variabile, CDS sau NASA Exoplanet Archive.</div>
      </article>
    </section>
  `;
}

export function communityView() {
  return `
    <section class="forum-grid">
      <article class="panel">
        <div class="space-between"><h3>Forum & grupuri pe judete</h3><span class="small-copy">Comunitate simulata pentru MVP</span></div>
        <div class="forum-list">
          ${forumTopics
            .map((topic) => `<article class="forum-item"><div class="forum-meta"><h4>${topic.title}</h4><span class="pill">${topic.county}</span></div><p class="muted">${topic.summary}</p><div class="forum-meta"><span>@${topic.author}</span><span>${topic.replies} raspunsuri</span></div></article>`)
            .join("")}
        </div>
      </article>
      <article class="panel">
        <h3>Ghid comunitate</h3>
        <div class="check-list">
          <div class="callout">Cere ajutor pe solutie, nu doar pe raspunsul final.</div>
          <div class="callout">Formeaza grupuri mici de lucru pe judet sau online, cu intalniri saptamanale.</div>
          <div class="callout">Compara metode de rezolvare si verifica unitatile la fiecare pas.</div>
        </div>
      </article>
    </section>
  `;
}

export function bindToolForms() {
  const orbitForm = document.getElementById("orbit-form");
  const magnitudeForm = document.getElementById("magnitude-form");
  const rocketForm = document.getElementById("rocket-form");

  if (orbitForm) {
    orbitForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(orbitForm);
      const a = Number(data.get("semiMajorAxis")) * 1000;
      const mu = Number(data.get("mu")) * 1_000_000_000;
      const period = (2 * Math.PI * Math.sqrt(a ** 3 / mu)) / 60;
      document.getElementById("orbit-output").textContent = `Perioada orbitala este aproximativ ${period.toFixed(2)} minute.`;
    });
  }

  if (magnitudeForm) {
    magnitudeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(magnitudeForm);
      const m1 = Number(data.get("m1"));
      const m2 = Number(data.get("m2"));
      const ratio = 10 ** ((m2 - m1) / 2.5);
      document.getElementById("magnitude-output").textContent = `Obiectul 1 este de aproximativ ${ratio.toFixed(2)} ori mai stralucitor decat obiectul 2.`;
    });
  }

  if (rocketForm) {
    rocketForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(rocketForm);
      const ve = Number(data.get("ve"));
      const m0 = Number(data.get("m0"));
      const mf = Number(data.get("mf"));
      const dv = ve * Math.log(m0 / mf);
      document.getElementById("rocket-output").textContent = `Delta-v maxim este ${dv.toFixed(1)} m/s.`;
    });
  }
}
