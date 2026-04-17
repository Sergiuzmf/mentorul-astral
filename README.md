# Mentorul Astral

Platforma React + Node.js pentru pregatirea la Olimpiada Nationala de Astronomie si Astrofizica, construita ca AI tutor activ, nu doar ca problem bank.

## Ce include acum

- autentificare completa cu JWT + cookie `httpOnly` fallback
- backend Express + PostgreSQL
- chat AI cu streaming Server-Sent Events
- profil de invatare persistent
- onboarding pe materii si ultimul subiect de matematica stapanit
- obiective zilnice flexibile si plan AI
- sesiuni interdisciplinare matematica + fizica + astrofizica + astronomie
- mock tests adaptive cu generare si analiza
- biblioteca cu pagini de resurse reale
- niveluri, XP si leaderboard
- atlas al cerului cu embed Aladin Lite + obiecte deep-sky
- salvare de explicatii in notes
- suport pentru upload de imagine in chat
- input vocal si voice output in browser

## OpenAI integration

Implementarea foloseste OpenAI Responses API pe backend si este pregatita pentru `gpt-4o` prin variabila `OPENAI_MODEL`.

Documentatie oficiala folosita:
- [Streaming responses](https://developers.openai.com/api/docs/guides/streaming-responses)
- [Responses API reference](https://platform.openai.com/docs/api-reference/responses/streaming)
- [GPT-4o model](https://developers.openai.com/api/docs/models/gpt-4o)

Inferenta mea din sursele oficiale:
- `gpt-4o` suporta text + image input, text output si streaming prin Responses API, deci este potrivit pentru chat tutoring, analiza de solutii incarcate si explicatii adaptive.

## Environment

### Backend

[backend/.env.example](</C:/Users/Sergiu/Documents/New project/backend/.env.example>)

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/onaa_prep
JWT_SECRET=replace-me-with-a-long-random-secret
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o
OPENAI_BASE_URL=https://api.openai.com/v1
AI_DAILY_MESSAGE_LIMIT=50
```

Fara `OPENAI_API_KEY`, aplicatia ruleaza in `demo mode` cu fallback local pentru explicatii, planuri si mock-test analysis.

## Run

```powershell
npm install
npm run dev
```

Frontend:
- `http://127.0.0.1:5173`

Backend:
- `http://localhost:4000`

## Database

Ruleaza [schema.sql](</C:/Users/Sergiu/Documents/New project/schema.sql>) sau lasa backend-ul sa creeze automat tabelele lipsa la startup.

Tabele AI principale:
- `ai_learning_profile`
- `ai_conversations`
- `ai_content_cache`
- `user_goals`
- `user_preferences`
- `user_progression`
- `progression_events`
- `saved_explanations`
- `mock_test_attempts`

## Main files

- [frontend/src/components/AIChatWidget.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/components/AIChatWidget.jsx>)
- [frontend/src/components/AIChatPanel.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/components/AIChatPanel.jsx>)
- [frontend/src/pages/DashboardPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/DashboardPage.jsx>)
- [frontend/src/pages/StudyAreaPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/StudyAreaPage.jsx>)
- [frontend/src/pages/TutorPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/TutorPage.jsx>)
- [frontend/src/pages/LibraryPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/LibraryPage.jsx>)
- [frontend/src/pages/ResourcePage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/ResourcePage.jsx>)
- [frontend/src/pages/MockTestsPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/MockTestsPage.jsx>)
- [frontend/src/pages/ConstellationsPage.jsx](</C:/Users/Sergiu/Documents/New project/frontend/src/pages/ConstellationsPage.jsx>)
- [backend/src/routes/ai.js](</C:/Users/Sergiu/Documents/New project/backend/src/routes/ai.js>)
- [backend/src/routes/preferences.js](</C:/Users/Sergiu/Documents/New project/backend/src/routes/preferences.js>)
- [backend/src/routes/progression.js](</C:/Users/Sergiu/Documents/New project/backend/src/routes/progression.js>)
- [backend/src/services/aiTutor.js](</C:/Users/Sergiu/Documents/New project/backend/src/services/aiTutor.js>)
- [backend/src/services/preferences.js](</C:/Users/Sergiu/Documents/New project/backend/src/services/preferences.js>)
- [backend/src/services/progression.js](</C:/Users/Sergiu/Documents/New project/backend/src/services/progression.js>)
- [backend/src/services/schema.js](</C:/Users/Sergiu/Documents/New project/backend/src/services/schema.js>)

## Matematica pentru Seniori ONAA

Pe baza paginilor oficiale care publica programa ONAA pentru 2025-2026 si a structurii tipice a problemelor de Seniori, aplicatia trateaza ca utile pentru Seniori:
- trigonometrie
- vectori
- logaritmi si exponentiale
- derivare
- integrale
- analiza matematica de baza

Surse pentru programa:
- [ISJ Arges ONAA 2026](https://isjarges.ro/olimpiada-nationala-de-astronomie-si-astrofizica/)
- [ISJ Iasi Programa ONAA 2025](https://isjiasi.ro/2025/01/10/programa-pentru-olimpiada-de-astronomie-si-astrofizica/)
- [CNEX - Programa olimpiadei](https://astro.gen-z.ro/materiale/programa-olimpiadei)

Inferenta mea:
- continutul exact din PDF nu este reprodus aici, dar pentru Seniori este rezonabil sa pregatim elevul pana la nivelul unde poate folosi instrumente de analiza si modele matematice simple in mecanica orbitala, fotometrie si fizica stelara.

## Deploy pe web

Am pregatit [render.yaml](</C:/Users/Sergiu/Documents/New project/render.yaml>) pentru o varianta simpla:
- backend Node.js pe Render
- frontend static pe Render

Pasii cand vrei sa publicam:
1. Creezi un cont pe [Render](https://render.com/)
2. Urcam proiectul intr-un repository GitHub
3. In Render alegi `New` -> `Blueprint`
4. Selectezi repository-ul care contine proiectul
5. Completezi variabilele:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `OPENAI_BASE_URL`
   - `CLIENT_URL`
   - `CLIENT_URLS`
   - `VITE_API_BASE_URL`
6. Deploy

Cand esti gata de publicare, te pot ghida pas cu pas pana la linkul final live.

## Notes

- AI-ul te ajuta sa inveti, dar verifica intotdeauna si materialele oficiale ONAA.
- Pentru productie reala, urmatorii pasi naturali sunt:
  - logging/observability
  - stronger moderation
  - background job-uri pentru pre-generation cache
  - object storage pentru upload-uri
  - server-side OCR pipeline
