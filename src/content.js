export const navigation = [
  { id: "dashboard", label: "Tablou de bord" },
  { id: "curriculum", label: "Curriculum 12 luni" },
  { id: "daily", label: "Ora de Astrofizica" },
  { id: "problems", label: "Banca de probleme" },
  { id: "simulator", label: "Simulator judetean" },
  { id: "resources", label: "Resurse" },
  { id: "tools", label: "Instrumente" },
  { id: "community", label: "Comunitate" }
];

export const modules = [
  {
    id: "m1",
    month: "Luna 1",
    title: "Fundamente astronomice si sisteme de coordonate",
    duration: "12 ore",
    prerequisites: "Trigonometrie, vectori, mecanica de liceu",
    focus: "Sfera cereasca, ascensie dreapta, declinatie, coordonate orizontale, timp sideral",
    readinessWeight: 0.08
  },
  {
    id: "m2",
    month: "Luna 2",
    title: "Miscarea aparenta a cerului si navigatie cereasca",
    duration: "14 ore",
    prerequisites: "Modulul 1",
    focus: "Ora siderala, culminatie, latitudine geografica, identificare pe harta muta",
    readinessWeight: 0.08
  },
  {
    id: "m3",
    month: "Luna 3",
    title: "Legile lui Kepler si problema celor doua corpuri",
    duration: "18 ore",
    prerequisites: "Mecanica clasica, ecuatii algebrice",
    focus: "Elemente orbitale, perioada, energie specifica, moment cinetic",
    readinessWeight: 0.1
  },
  {
    id: "m4",
    month: "Luna 4",
    title: "Mecanica orbitala aplicata",
    duration: "18 ore",
    prerequisites: "Modulul 3",
    focus: "Transfer Hohmann, viteza de scapare, intersectii orbitale, manevre impulsive",
    readinessWeight: 0.12
  },
  {
    id: "m5",
    month: "Luna 5",
    title: "Fotometrie si distante astronomice",
    duration: "12 ore",
    prerequisites: "Logaritmi, notiuni de radiatie",
    focus: "Magnitudine aparenta si absoluta, formula lui Pogson, modulul distantei, paralaxa",
    readinessWeight: 0.08
  },
  {
    id: "m6",
    month: "Luna 6",
    title: "Fizica stelara si diagrama HR",
    duration: "16 ore",
    prerequisites: "Termodinamica, radiatie corp negru",
    focus: "Clasificare spectrala, echilibru hidrostatic, relatia masa-luminozitate",
    readinessWeight: 0.09
  },
  {
    id: "m7",
    month: "Luna 7",
    title: "Evolutia stelara si mediul interstelar",
    duration: "14 ore",
    prerequisites: "Modulul 6",
    focus: "Secventa principala, gigante rosii, pitice albe, supernove, mediu interstelar",
    readinessWeight: 0.08
  },
  {
    id: "m8",
    month: "Luna 8",
    title: "Soarele si vremea spatiala",
    duration: "10 ore",
    prerequisites: "Modulul 6",
    focus: "Structura solara, pete solare, vant solar, eruptii si impactul asupra observatiilor",
    readinessWeight: 0.06
  },
  {
    id: "m9",
    month: "Luna 9",
    title: "Rachete si ecuatia Tsiolkovsky",
    duration: "12 ore",
    prerequisites: "Impuls, conservarea momentului, logaritmi",
    focus: "delta-v, raport de masa, secvente de misiune, buget de manevra",
    readinessWeight: 0.09
  },
  {
    id: "m10",
    month: "Luna 10",
    title: "Analiza de date si observatii",
    duration: "16 ore",
    prerequisites: "Statistica elementara, grafice",
    focus: "Curbe de lumina, seturi de date astronomice, incertitudini, interpretare",
    readinessWeight: 0.08
  },
  {
    id: "m11",
    month: "Luna 11",
    title: "Matematica pentru astrofizica",
    duration: "14 ore",
    prerequisites: "Derivate, integrale, vectori",
    focus: "Ecuatii diferentiale simple, aproximari, rotatii, derivare dimensionala",
    readinessWeight: 0.07
  },
  {
    id: "m12",
    month: "Luna 12",
    title: "Integrare finala si antrenament de concurs",
    duration: "20 ore",
    prerequisites: "Toate modulele anterioare",
    focus: "Simulari complete, recapitulare rapida, strategie de examen si verificare solutii",
    readinessWeight: 0.07
  }
];

export const achievements = [
  { id: "a1", title: "Primul Pas", description: "Finalizeaza prima sesiune zilnica.", xp: 50 },
  { id: "a2", title: "Streak de o saptamana", description: "Studiaza 7 zile la rand.", xp: 100 },
  { id: "a3", title: "Cartograf al Cerului", description: "Rezolva 5 exercitii de coordonate ceresti.", xp: 120 },
  { id: "a4", title: "Maestru al Mecanicii Orbitale", description: "Obtine peste 85% la 10 probleme orbitale.", xp: 180 },
  { id: "a5", title: "Ready for ONAA", description: "Readiness Score peste 82.", xp: 220 }
];

export const weeklyChallenges = [
  {
    title: "Saptamana Kepler",
    description: "3 probleme cu perioade orbitale, viteze si transferuri.",
    reward: "120 XP"
  },
  {
    title: "Flash Recall Marathon",
    description: "Revizuieste 30 de flashcarduri fara pauza mai mare de 10 secunde.",
    reward: "Badge Astronom"
  },
  {
    title: "Data Dive",
    description: "Analizeaza o curba de lumina si extrage perioada unei stele variabile.",
    reward: "90 XP"
  }
];

export const forumTopics = [
  {
    county: "Cluj",
    title: "Grup de studiu Seniori 2",
    author: "user_astro_91",
    replies: 18,
    summary: "Intalnire online sambata pentru probleme de magnitudini si HR diagram."
  },
  {
    county: "Bucuresti",
    title: "Cum invatati pentru proba de harta muta?",
    author: "stelar_ro",
    replies: 23,
    summary: "Resurse, exercitii si metoda rapida de identificare a constelatiilor."
  },
  {
    county: "Iasi",
    title: "Set de probleme originale pe transfer Hohmann",
    author: "s2_orbits",
    replies: 12,
    summary: "Discutie despre erori frecvente la calculele de delta-v si energii."
  }
];

export const flashcards = [
  { front: "Constanta gravitationala", back: "G = 6.674 x 10^-11 N m^2 / kg^2" },
  { front: "Unitate astronomica", back: "1 AU = 1.496 x 10^11 m" },
  { front: "Formula modulului distantei", back: "m - M = 5 log10(d/10 pc)" },
  { front: "Legea a III-a Kepler", back: "T^2 proportional cu a^3 pentru orbite in jurul aceluiasi corp central" },
  { front: "Ecuatia rachetei", back: "delta-v = ve ln(m0 / mf)" },
  { front: "Clase spectrale", back: "O B A F G K M, de la cele mai fierbinti la cele mai reci" },
  { front: "Magnitudini", back: "Diferenta de 5 magnitudini inseamna raport de stralucire 100" },
  { front: "Paralaxa", back: "d(pc) = 1 / p(arcsec)" }
];

export const resources = [
  {
    type: "Manual",
    title: "Astrofizica - D. Balaes",
    description: "Text romanesc clasic pentru notiuni teoretice si probleme de baza.",
    link: "https://www.worldcat.org/",
    note: "Folosit ca reper bibliografic; verifica disponibilitatea in biblioteci."
  },
  {
    type: "Carte universitara",
    title: "Introduction to Modern Astrophysics - Carroll & Ostlie",
    description: "Capitole selectate pentru stele, radiatie, fotometrie si dinamica.",
    link: "https://global.oup.com/",
    note: "Excelent pentru aprofundare si trecerea spre nivel universitar."
  },
  {
    type: "Regulament",
    title: "Regulament ONAA 2026",
    description: "Structura probelor, etape, praguri si sectiuni oficiale.",
    link: "https://www.edu.ro/sites/default/files/_fi%C8%99iere/Minister/2026/olimpiade_concursuri/regulamente_actualizate/Regulament_ONAA_2026.pdf",
    note: "Sursa oficiala MEC."
  },
  {
    type: "Programa",
    title: "Programa ONAA 2025",
    description: "Temele orientative pentru juniori si seniori.",
    link: "https://astro.gen-z.ro/materiale/programa-olimpiadei",
    note: "Utila pentru orientare, dar verifica versiunea curenta."
  }
];

export const originalProblems = [
  {
    id: "p1",
    title: "Orbita joasa circulara",
    category: "Mecanica cereasca",
    level: "Beginner",
    estimatedMinutes: 12,
    prompt:
      "Un satelit orbiteaza circular Pamantul la altitudinea h = 400 km. Folosind R_T = 6371 km si μ = 3.986 x 10^14 m^3/s^2, determina perioada orbitala.",
    formula: "T = 2π sqrt(a^3 / μ), unde a = R_T + h",
    solution:
      "a = 6.771 x 10^6 m. T = 2π sqrt((6.771 x 10^6)^3 / 3.986 x 10^14) ≈ 5545 s ≈ 92.4 min.",
    topic: "orbits"
  },
  {
    id: "p2",
    title: "Comparatie de magnitudini",
    category: "Astronomie observationala",
    level: "Beginner",
    estimatedMinutes: 10,
    prompt:
      "Doua stele au magnitudinile aparente m1 = 2 si m2 = 5. De cate ori este prima mai stralucitoare decat a doua?",
    formula: "F1 / F2 = 10^((m2 - m1) / 2.5)",
    solution:
      "F1 / F2 = 10^1.2 ≈ 15.85. Prima stea este de aproximativ 15.9 ori mai stralucitoare.",
    topic: "photometry"
  },
  {
    id: "p3",
    title: "Paralaxa stelara",
    category: "Astronomie observationala",
    level: "Beginner",
    estimatedMinutes: 8,
    prompt: "O stea are paralaxa anuala p = 0.2 arcsec. Determina distanta in parseci si in ani-lumina.",
    formula: "d(pc) = 1 / p(arcsec)",
    solution: "d = 5 pc, adica aproximativ 16.3 ani-lumina.",
    topic: "observation"
  },
  {
    id: "p4",
    title: "Legea a treia Kepler",
    category: "Mecanica cereasca",
    level: "Intermediate",
    estimatedMinutes: 14,
    prompt:
      "Planeta A are semiaxa mare 1 AU si perioada 1 an. Ce perioada are planeta B cu semiaxa mare 4 AU in jurul aceleiasi stele?",
    formula: "T_B / T_A = (a_B / a_A)^(3/2)",
    solution: "T_B = 8 ani.",
    topic: "orbits"
  },
  {
    id: "p5",
    title: "Transfer Hohmann spre orbita geostationara",
    category: "Mecanica orbitala",
    level: "Advanced",
    estimatedMinutes: 20,
    prompt:
      "Calculeaza conceptual cele doua impulsuri pentru un transfer Hohmann de la r1 = 7000 km la r2 = 42164 km in jurul Pamantului.",
    formula: "v_c = sqrt(μ/r), v_t,p = sqrt(μ(2/r1 - 1/a_t)), v_t,a = sqrt(μ(2/r2 - 1/a_t))",
    solution:
      "a_t = 24582 km. Rezulta aproximativ Δv1 ≈ 2.33 km/s si Δv2 ≈ 1.43 km/s, total ≈ 3.76 km/s.",
    topic: "orbits"
  },
  {
    id: "p6",
    title: "Ecuatia rachetei",
    category: "Aplicatii spatiale",
    level: "Intermediate",
    estimatedMinutes: 14,
    prompt: "O treapta de racheta are viteza efectiva a gazelor ve = 3.1 km/s si raportul de masa m0/mf = 4. Determina delta-v maxim.",
    formula: "delta-v = ve ln(m0/mf)",
    solution: "delta-v ≈ 4.30 km/s.",
    topic: "rockets"
  },
  {
    id: "p7",
    title: "Temperatura unei stele",
    category: "Fizica stelara",
    level: "Intermediate",
    estimatedMinutes: 15,
    prompt: "O stea are luminozitatea de 16 ori mai mare decat Soarele si raza de 2 ori mai mare. Raporteaza temperatura ei la temperatura Soarelui.",
    formula: "L ∝ R^2 T^4",
    solution: "T/Ts = sqrt(2) ≈ 1.414.",
    topic: "stellar"
  },
  {
    id: "p8",
    title: "Clasificare pe diagrama HR",
    category: "Fizica stelara",
    level: "Beginner",
    estimatedMinutes: 9,
    prompt: "O stea are temperatura mare si luminozitate mica. In ce zona a diagramei HR se afla cel mai probabil?",
    formula: "Interpretare calitativa a diagramei HR",
    solution: "In zona piticelor albe.",
    topic: "stellar"
  },
  {
    id: "p9",
    title: "Distanta din modulul distantei",
    category: "Fotometrie",
    level: "Intermediate",
    estimatedMinutes: 12,
    prompt: "Pentru o stea cu magnitudine aparenta m = 8 si magnitudine absoluta M = 3, determina distanta in parseci.",
    formula: "m - M = 5 log10(d/10)",
    solution: "d = 100 pc.",
    topic: "photometry"
  },
  {
    id: "p10",
    title: "Viteza de scapare",
    category: "Mecanica cereasca",
    level: "Intermediate",
    estimatedMinutes: 12,
    prompt: "Deduce viteza de scapare de la suprafata unui corp ceresc de masa M si raza R.",
    formula: "(1/2)mv^2 = GMm/R",
    solution: "v_e = sqrt(2GM/R).",
    topic: "orbits"
  },
  {
    id: "p11",
    title: "Timp sideral local",
    category: "Navigatie cereasca",
    level: "Advanced",
    estimatedMinutes: 16,
    prompt: "La Greenwich timpul sideral local este 8h. Ce timp sideral local are un observator aflat la longitudinea estica de 45°?",
    formula: "15° corespund unei ore de timp sideral",
    solution: "45° E inseamna +3h fata de Greenwich, deci TSL = 11h.",
    topic: "navigation"
  },
  {
    id: "p12",
    title: "Inaltimea Polarei",
    category: "Navigatie cereasca",
    level: "Intermediate",
    estimatedMinutes: 11,
    prompt: "Pentru un observator din emisfera nordica aflat la latitudinea 46°, ce inaltime aproximativa are Polaris deasupra orizontului?",
    formula: "Altitudinea Polarei ≈ latitudinea locului",
    solution: "Altitudinea este aproximativ 46°.",
    topic: "navigation"
  },
  {
    id: "p13",
    title: "Legea Wien",
    category: "Fizica stelara",
    level: "Intermediate",
    estimatedMinutes: 10,
    prompt: "Maximul de emisie al unei stele este la 500 nm. Estimeaza temperatura ei folosind b = 2.9 x 10^-3 m K.",
    formula: "λ_max T = b",
    solution: "T ≈ 5800 K.",
    topic: "stellar"
  },
  {
    id: "p14",
    title: "Curba de lumina a unei variabile",
    category: "Analiza de date",
    level: "Advanced",
    estimatedMinutes: 20,
    prompt: "O curba de lumina prezinta maxime la zilele 2, 7, 12 si 17. Determina perioada si comenteaza consistenta datelor.",
    formula: "Perioada ≈ diferenta dintre maxime succesive",
    solution: "Perioada este 5 zile, iar datele sunt consistente.",
    topic: "data"
  },
  {
    id: "p15",
    title: "Energia orbitala specifica",
    category: "Mecanica orbitala",
    level: "Advanced",
    estimatedMinutes: 18,
    prompt: "Arata ca energia mecanica specifica a unei orbite eliptice este ε = -μ/(2a).",
    formula: "ε = v^2/2 - μ/r si vis-viva",
    solution: "Inlocuind relatia vis-viva in expresia energiei obtinem ε = -μ/(2a).",
    topic: "orbits"
  },
  {
    id: "p16",
    title: "Flux solar si distanta",
    category: "Spatiu si Soare",
    level: "Intermediate",
    estimatedMinutes: 10,
    prompt: "Daca un corp se indeparteaza de Soare de la 1 AU la 2 AU, cum se modifica fluxul primit?",
    formula: "F ∝ 1/r^2",
    solution: "Fluxul devine de 4 ori mai mic.",
    topic: "space-weather"
  },
  {
    id: "p17",
    title: "Masa stelei din legea a treia Kepler",
    category: "Sisteme stelare",
    level: "Advanced",
    estimatedMinutes: 19,
    prompt: "O exoplaneta are perioada de 8 ani si semiaxa mare 4 AU in jurul stelei sale. Estimeaza masa stelei in unitati solare.",
    formula: "T^2 = a^3 / M",
    solution: "M = 64/64 = 1 masa solara.",
    topic: "stellar"
  },
  {
    id: "p18",
    title: "Constelatii circumpolare",
    category: "Observatie",
    level: "Intermediate",
    estimatedMinutes: 11,
    prompt: "Explica in ce conditii o stea devine circumpolara pentru un observator din latitudinea φ in emisfera nordica.",
    formula: "δ > 90° - φ",
    solution: "Daca declinatia este suficient de mare incat cercul diurn sa nu intersecteze orizontul, steaua este circumpolara.",
    topic: "observation"
  },
  {
    id: "p19",
    title: "Raport de densitate medie",
    category: "Fizica stelara",
    level: "Advanced",
    estimatedMinutes: 16,
    prompt: "Doua stele au aceeasi masa, dar una are raza de 10 ori mai mare. De cate ori este densitatea medie mai mica?",
    formula: "ρ ∝ M / R^3",
    solution: "Densitatea scade de 1000 ori.",
    topic: "stellar"
  },
  {
    id: "p20",
    title: "Regula adaptiva de studiu",
    category: "Strategie de studiu",
    level: "Beginner",
    estimatedMinutes: 7,
    prompt: "Un elev obtine sub 60% la probleme de transfer Hohmann si greseste algebra in aproape toate etapele. Ce trebuie sa faca platforma adaptiva?",
    formula: "Regula pedagogica",
    solution: "Recomanda revizuirea prerechizitelor si reprogrameaza probleme mai usoare pe acelasi domeniu.",
    topic: "meta"
  },
  {
    id: "p21",
    title: "Observatie de tranzit",
    category: "Analiza de date",
    level: "Master",
    estimatedMinutes: 22,
    prompt: "Luminozitatea relativa a unei stele scade cu 1% in timpul tranzitului unei exoplanete. Estimeaza raportul razelor Rp/Rs.",
    formula: "ΔF/F ≈ (Rp/Rs)^2",
    solution: "Rp/Rs = sqrt(0.01) = 0.1.",
    topic: "data"
  },
  {
    id: "p22",
    title: "Rezolutie instrumentala",
    category: "Instrumente astronomice",
    level: "Master",
    estimatedMinutes: 18,
    prompt: "Ce efect are dublarea diametrului unui telescop asupra puterii de separare si a suprafetei colectoare?",
    formula: "θ ∝ λ/D, A ∝ D^2",
    solution: "Rezolutia se imbunatateste de 2 ori, iar suprafata colectoare creste de 4 ori.",
    topic: "observation"
  },
  {
    id: "p23",
    title: "Manevra de schimbare de plan",
    category: "Mecanica orbitala",
    level: "Master",
    estimatedMinutes: 21,
    prompt: "Un satelit aflat pe o orbita circulara cu viteza v = 7.5 km/s trebuie sa schimbe planul orbital cu 30°. Estimeaza delta-v pentru o schimbare instantanee de plan.",
    formula: "Δv = 2v sin(Δi/2)",
    solution: "Δv ≈ 3.88 km/s.",
    topic: "orbits"
  },
  {
    id: "p24",
    title: "Secventa principala sau gigant",
    category: "Fizica stelara",
    level: "Advanced",
    estimatedMinutes: 13,
    prompt: "Doua stele au aceeasi temperatura efectiva, dar una este de 100 ori mai luminoasa. Ce poti spune despre raza celei mai luminoase?",
    formula: "L ∝ R^2 T^4",
    solution: "Raza este de 10 ori mai mare; steaua mai luminoasa este probabil o gigantica.",
    topic: "stellar"
  }
];
