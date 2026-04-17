const mathTopics = [
  "Algebra de baza",
  "Trigonometrie",
  "Vectori",
  "Geometrie analitica",
  "Logaritmi si exponentiale",
  "Combinatorica",
  "Derivare",
  "Integrale",
  "Analiza matematica"
];

const studyTracks = [
  { id: "math", label: "Matematica pentru ONAA" },
  { id: "physics", label: "Fizica fundamentala" },
  { id: "astrophysics", label: "Astrofizica" },
  { id: "astronomy", label: "Astronomie observationala" }
];

const lectureCatalog = [
  {
    id: "intro-onaa",
    title: "Primii pasi in ONAA",
    track: "astrophysics",
    topicTag: "general",
    mathRequirement: "Algebra de baza",
    description: "Introducere in astronomie, astrofizica si modul de gandire pentru probleme de olimpiada.",
    goals: [
      "Intelegi diferenta dintre astronomie si astrofizica.",
      "Afli ce marimi si formule apar frecvent.",
      "Primesti o metoda de atac pentru problemele lungi."
    ],
    openingPrompt:
      "Preda o lectie introductiva pentru un elev nou la ONAA. Explica diferenta dintre astronomie si astrofizica, marimile uzuale si cum se abordeaza o problema. Ton clar, de profesor.",
    resourceIds: ["onaa-roadmap", "senior-problem-warmup"]
  },
  {
    id: "integrals-in-astrophysics",
    title: "Integrale si luminozitate stelara",
    track: "math",
    topicTag: "stellar_physics",
    mathRequirement: "Integrale",
    description: "Legam ideea de integrala de flux, energie radiata si distributii simple in astrofizica.",
    goals: [
      "Fixezi intuitia unei integrale ca suma continua.",
      "Vezi cum apare integrala in calcule de flux sau energie.",
      "Rezolvi o problema ONAA foarte usoara cu integrale."
    ],
    openingPrompt:
      "Preda o lectie de 45-60 minute despre integrale pentru ONAA. Incepe cu intuitia ariei si a sumei continue, apoi leaga conceptul de flux si luminozitate in astrofizica. Incheie cu o problema foarte usoara tip ONAA care foloseste o integrala simpla.",
    resourceIds: ["integrals-foundation", "integrals-astrophysics-problem-set"]
  },
  {
    id: "vectors-orbits",
    title: "Vectori si miscarea orbitala",
    track: "math",
    topicTag: "orbital_mechanics",
    mathRequirement: "Vectori",
    description: "Vectorii, viteza si acceleratia sunt puse in legatura directa cu orbitele si forta gravitationala.",
    goals: [
      "Recapitulezi vectorii in plan.",
      "Intelegi directia vitezei si acceleratiei pe orbita.",
      "Rezolvi un exercitiu ghidat de mecanica orbitala."
    ],
    openingPrompt:
      "Preda o lectie ghidata despre vectori aplicati in mecanica orbitala. Explica vectorii pozitie, viteza si acceleratie, apoi foloseste-i intr-o problema simpla de miscare orbitala.",
    resourceIds: ["vectors-orbital-notes", "kepler-problem-set"]
  },
  {
    id: "trigonometry-night-sky",
    title: "Trigonometrie pentru cerul noptii",
    track: "astronomy",
    topicTag: "constellations",
    mathRequirement: "Trigonometrie",
    description: "Unghiuri, altitudine, azimut si orientarea pe bolta cereasca pentru observatii reale.",
    goals: [
      "Revezi trigonometria de baza utila pe sfera cereasca.",
      "Legi coordonatele ceresti de repere observationale.",
      "Faci un exercitiu simplu de orientare."
    ],
    openingPrompt:
      "Preda o lectie despre trigonometria utila in astronomia observationala. Explica altitudine, azimut si cum folosesti unghiurile pentru orientare pe cerul noptii.",
    resourceIds: ["night-sky-trig", "celestial-navigation-mini-set"]
  },
  {
    id: "derivatives-motion",
    title: "Derivare si viteza instantanee in spatiu",
    track: "physics",
    topicTag: "orbital_mechanics",
    mathRequirement: "Derivare",
    description: "Derivata este introdusa prin viteza instantanee si schimbarea marimilor in timp.",
    goals: [
      "Fixezi sensul fizic al derivatei.",
      "Legi derivarea de viteza si acceleratie.",
      "Aplici pe o problema simpla de miscare."
    ],
    openingPrompt:
      "Preda o lectie pentru un elev care stie putin sau deloc derivare. Explica derivata prin viteza instantanee si acceleratie, apoi leaga asta de miscarea in spatiu si de un exemplu simplu ONAA.",
    resourceIds: ["derivatives-motion-guide", "motion-foundations"]
  }
];

module.exports = {
  lectureCatalog,
  mathTopics,
  studyTracks
};

