export const dashboardHighlights = [
  {
    label: "Model hibrid",
    value: "70/30",
    description: "Continut curatat plus explicatii AI personalizate."
  },
  {
    label: "AI Tutor",
    value: "Live",
    description: "Chat contextual, explicatii socratice si suport pe imagini."
  },
  {
    label: "Obiectiv",
    value: "ONAA",
    description: "Astronomie, astrofizica, mecanica orbitala si constelatii."
  }
];

export const studyModules = [
  {
    id: "orbital",
    title: "Mecanica Orbitala",
    summary: "Kepler, problema celor doua corpuri, transfer Hohmann, delta-v si viteza de scapare.",
    formula: "v^2 = mu(2/r - 1/a)"
  },
  {
    id: "stellar",
    title: "Fizica Stelara",
    summary: "Diagrama HR, Stefan-Boltzmann, Wien, evolutie stelara si clasificare spectrala.",
    formula: "L = 4piR^2 sigma T^4"
  },
  {
    id: "photometry",
    title: "Fotometrie si distante",
    summary: "Magnitudini, modulul distantei, paralaxa, flux si observatii.",
    formula: "m - M = 5 log10(d/10 pc)"
  },
  {
    id: "constellations",
    title: "Constelatii si navigatie",
    summary: "Carul Mare, Cassiopeia, Orion, Polaris si orientare pe cerul din Bucuresti.",
    formula: "altitudinea Polarei aproximativ egala cu latitudinea"
  }
];

export const formulaCards = [
  {
    title: "Gravitatie universala",
    latex: "F = G\\frac{m_1m_2}{r^2}",
    explainPrompt:
      "Explica formula gravitatiei universale pas cu pas, ca pentru un elev de 15 ani, in romana."
  },
  {
    title: "Legea a III-a Kepler",
    latex: "T^2 \\propto a^3",
    explainPrompt:
      "Explica legea a III-a a lui Kepler cu intuitie fizica si un exemplu numeric simplu."
  },
  {
    title: "Stefan-Boltzmann",
    latex: "L = 4\\pi R^2\\sigma T^4",
    explainPrompt:
      "Explica formula Stefan-Boltzmann si de ce temperatura apare la puterea a patra."
  }
];

export const mockPresets = [
  { label: "Rapid 30 min", minutes: 30, difficulty: "intermediate" },
  { label: "Standard 60 min", minutes: 60, difficulty: "advanced" },
  { label: "Judetean 90 min", minutes: 90, difficulty: "advanced" },
  { label: "National 180 min", minutes: 180, difficulty: "expert" }
];
