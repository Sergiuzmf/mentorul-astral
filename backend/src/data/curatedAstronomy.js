const curatedTopicLibrary = {
  kepler_laws: {
    title: "Legile lui Kepler",
    explanation:
      "Legea I spune ca planetele se misca pe elipse cu Soarele intr-un focar. Legea II spune ca raza vectoare maturata in intervale egale de timp acopera arii egale, ceea ce inseamna viteza mai mare aproape de periheliu. Legea III leaga perioada de semiaxa mare prin T^2 proportional cu a^3.",
    formulas: ["T^2 proportional cu a^3", "v^2 = mu(2/r - 1/a)"],
    socraticQuestions: [
      "Ce crezi ca se intampla cu perioada daca semiaxa mare creste de 4 ori?",
      "De ce viteza pe orbita nu poate fi constanta pe o elipsa?"
    ]
  },
  orbital_mechanics: {
    title: "Mecanica orbitala",
    explanation:
      "In mecanica orbitala urmarim relatia dintre energie, moment cinetic si geometria orbitei. Transferul Hohmann este cea mai economica mutare intre doua orbite circulare coplanare, dar are doua impulsuri si un timp de zbor clar determinat.",
    formulas: ["delta-v = v_e ln(m0/mf)", "epsilon = -mu/(2a)"],
    socraticQuestions: [
      "Daca marim raza orbitei finale, ce se intampla cu costul total delta-v?",
      "De ce schimbarea planului orbital devine foarte costisitoare la viteze mari?"
    ]
  },
  magnitude_scale: {
    title: "Scala magnitudinilor",
    explanation:
      "Magnitudinea este o scara logaritmica. O diferenta de 5 magnitudini corespunde unui raport de flux 100. Asta inseamna ca mici schimbari pe scara numerica pot reprezenta diferente fizice mari in stralucire.",
    formulas: ["F1/F2 = 10^((m2 - m1)/2.5)", "m - M = 5 log10(d/10pc)"],
    socraticQuestions: [
      "Daca o stea are magnitudinea mai mica, este mai stralucitoare sau mai slaba?",
      "Ce se intampla cu fluxul cand diferenta de magnitudine este 2.5?"
    ]
  },
  stellar_physics: {
    title: "Fizica stelara",
    explanation:
      "Stelele isi stabilesc proprietatile observabile prin echilibrul dintre gravitatie si presiune. Luminozitatea depinde de raza si temperatura prin legea Stefan-Boltzmann, iar diagrama HR spune povestea evolutiei stelare.",
    formulas: ["L = 4piR^2 sigma T^4", "lambda_max T = b"],
    socraticQuestions: [
      "Cum s-ar schimba luminozitatea daca raza se dubleaza iar temperatura ramane constanta?",
      "Ce tip de obiect este fierbinte dar putin luminos?"
    ]
  },
  constellations: {
    title: "Constelatii si navigatie",
    explanation:
      "Constelatiile sunt repere vizuale. Pentru orientare in emisfera nordica, Carul Mare si Carul Mic sunt cele mai utile deoarece ne conduc rapid la Polaris, steaua apropiata de polul nord ceresc.",
    formulas: ["altitudinea Polarei aproximativ egala cu latitudinea locului", "TSL = GST + longitudine/15"],
    socraticQuestions: [
      "Ce legatura are inaltimea Polarei cu pozitia observatorului pe Pamant?",
      "Cum ai folosi stelele indicatoare din Carul Mare pentru a gasi nordul?"
    ]
  }
};

const remediationTemplates = {
  kepler_laws: [
    "Deriveaza perioada unei planete cu semiaxa mare dubla fata de a Pamantului.",
    "Explica de ce o planeta se misca mai repede la periheliu decat la afeliu."
  ],
  orbital_mechanics: [
    "Calculeaza conceptual cele doua impulsuri pentru un transfer Hohmann intre 7000 km si 14000 km.",
    "Compara costul unui transfer orbital cu costul unei schimbari de plan de 20 grade."
  ],
  magnitude_scale: [
    "Doua stele difera cu 3 magnitudini. Care este raportul de flux?",
    "Gaseste distanta unei stele cu m=9 si M=4."
  ],
  stellar_physics: [
    "Foloseste legea Wien pentru o stea cu maxim la 400 nm.",
    "O stea are aceeasi temperatura ca Soarele dar este de 9 ori mai luminoasa. Ce raza are?"
  ]
};

module.exports = {
  curatedTopicLibrary,
  remediationTemplates
};
