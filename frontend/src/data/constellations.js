export const localConstellations = [
  {
    id: "ursa-major",
    name: "Ursa Mare",
    story:
      "Carul Mare este cea mai usor de recunoscut parte a Ursului Mare. Cele doua stele din marginea cupei, Dubhe si Merak, indica direct spre Polaris.",
    aiPrompt:
      "Explica in romana, pe ton cald si vizual, cum gasesti Polaris pornind de la Dubhe si Merak din Carul Mare.",
    stars: [
      { x: 12, y: 30, label: "Dubhe", magnitude: 1.8 },
      { x: 28, y: 42, label: "Merak", magnitude: 2.3 },
      { x: 42, y: 38, label: "Phecda", magnitude: 2.4 },
      { x: 56, y: 28, label: "Megrez", magnitude: 3.3 },
      { x: 68, y: 18, label: "Alioth", magnitude: 1.8 },
      { x: 82, y: 24, label: "Mizar", magnitude: 2.2 },
      { x: 90, y: 38, label: "Alkaid", magnitude: 1.9 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    story:
      "Cassiopeia are forma unui W clar si este foarte utila cand Carul Mare este jos pe cer. Se afla de partea opusa lui Polaris fata de Ursa Mare.",
    aiPrompt:
      "Povesteste pe scurt mitul Cassiopeiei si explica de ce forma de W este utila pentru orientare astronomica.",
    stars: [
      { x: 12, y: 46, label: "Schedar", magnitude: 2.2 },
      { x: 28, y: 22, label: "Caph", magnitude: 2.3 },
      { x: 46, y: 44, label: "Gamma Cas", magnitude: 2.4 },
      { x: 68, y: 18, label: "Ruchbah", magnitude: 2.7 },
      { x: 88, y: 42, label: "Segin", magnitude: 3.3 }
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    id: "orion",
    name: "Orion",
    story:
      "Orion este constelatia de iarna cu centura foarte recognoscibila. Betelgeuse si Rigel marcheaza umarul si piciorul vanatorului.",
    aiPrompt:
      "Descrie vizual constelatia Orion pentru un elev de liceu si explica de ce centura este un reper excelent pe cerul de iarna.",
    stars: [
      { x: 18, y: 20, label: "Betelgeuse", magnitude: 0.5 },
      { x: 36, y: 40, label: "Bellatrix", magnitude: 1.6 },
      { x: 44, y: 48, label: "Alnitak", magnitude: 1.7 },
      { x: 56, y: 44, label: "Alnilam", magnitude: 1.7 },
      { x: 68, y: 48, label: "Mintaka", magnitude: 2.2 },
      { x: 74, y: 76, label: "Rigel", magnitude: 0.1 },
      { x: 32, y: 82, label: "Saiph", magnitude: 2.1 }
    ],
    lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 6], [4, 5]]
  }
];
