export const libraryResources = [
  {
    id: "orbital-doc",
    title: "Orbital Mechanics Essentials",
    kind: "Documentar ghidat",
    topic: "astrophysics",
    description: "O pagina de orientare care te ajuta sa extragi ideile importante dintr-un material despre transferuri orbitale.",
    sections: [
      {
        heading: "Ce urmaresti",
        body:
          "Cand parcurgi un documentar sau un material video despre orbite, urmareste energia orbitala, transferul Hohmann si sensul lui delta-v."
      }
    ],
    actions: [
      {
        label: "Discuta documentarul cu AI",
        type: "tutor",
        prompt:
          "Recapituleaza ideile-cheie pe care trebuie sa le retin dintr-un documentar introductiv despre mecanica orbitala si transfer Hohmann.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "orbital-text",
    title: "Paragraful despre energia specifica orbitala",
    kind: "Lectura ghidata",
    topic: "astrophysics",
    description: "O resursa scurta despre cum citesti si intelegi un paragraf tehnic legat de orbite.",
    sections: [
      {
        heading: "Cum citesti",
        body:
          "Identifica marimea conservata, semnificatia semiaxei mari si legatura dintre energie si tipul orbitei."
      }
    ],
    actions: [
      {
        label: "Explica-mi paragraful",
        type: "tutor",
        prompt:
          "Explica pe intelesul unui elev un paragraf despre energia specifica orbitala si semiaxa mare.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "stellar-doc",
    title: "Birth, Life and Death of Stars",
    kind: "Documentar ghidat",
    topic: "astrophysics",
    description: "Reperele pe care trebuie sa le retii dintr-un material despre evolutia stelara.",
    sections: [
      {
        heading: "Idei-cheie",
        body:
          "Concentreaza-te pe secventa principala, echilibrul hidrostatic, gigante rosii, supernove si pitice albe."
      }
    ],
    actions: [
      {
        label: "Recapituleaza cu AI",
        type: "tutor",
        prompt:
          "Recapituleaza etapele evolutiei stelare si explica de ce conteaza pentru ONAA.",
        topic: "stellar_physics"
      }
    ]
  },
  {
    id: "photo-sheet",
    title: "Magnitudini si distante intr-o pagina",
    kind: "Fisa de recapitulare",
    topic: "astrophysics",
    description: "Un rezumat scurt pentru magnitudini, flux, modulul distantei si paralaxa.",
    sections: [
      {
        heading: "Retine",
        body:
          "Scala magnitudinilor este logaritmica, diferenta de 5 magnitudini inseamna raport de flux 100, iar distanta apare natural in modulul distantei."
      }
    ],
    actions: [
      {
        label: "Foloseste fisa cu AI",
        type: "tutor",
        prompt:
          "Preda-mi pe scurt scala magnitudinilor si modulul distantei, apoi da-mi 2 exercitii rapide.",
        topic: "magnitude_scale"
      }
    ]
  },
  {
    id: "sky-guide",
    title: "Repere rapide pe cerul din Romania",
    kind: "Ghid observational",
    topic: "astronomy",
    description: "Stele si obiecte usor de gasit pe cer, utile pentru cultura observationala.",
    sections: [
      {
        heading: "Repere bune",
        body:
          "Carul Mare, Cassiopeia, Orion, Pleiadele si M31 sunt repere excelente pentru antrenamentul observational."
      }
    ],
    actions: [
      {
        label: "Antreneaza orientarea cu AI",
        type: "tutor",
        prompt:
          "Antreneaza-ma cu repere rapide pe cerul Romaniei: Carul Mare, Cassiopeia, Orion, Pleiadele si M31.",
        topic: "constellations"
      }
    ]
  },
  {
    id: "onaa-roadmap",
    title: "Roadmap ONAA pentru incepatori",
    kind: "Ghid de inceput",
    topic: "astrophysics",
    description: "Ce trebuie sa stii la inceput, ce teme mari exista si cum legi matematica de fizica si astrofizica.",
    sections: [
      {
        heading: "Ce inveti la Seniori",
        body:
          "La Seniori apar mecanica orbitala, fotometrie, fizica stelara si astronomie observationala. Asta inseamna ca elevul are nevoie de fizica peste nivelul standard si de matematica aplicata."
      },
      {
        heading: "Matematica utila",
        body:
          "Pentru multe probleme ajuta trigonometria, vectorii, logaritmii, derivarea si uneori integralele. In aplicatie, aceste teme apar separat si combinate cu fizica."
      }
    ],
    actions: [
      {
        label: "Porneste lectia introductiva",
        type: "tutor",
        prompt:
          "Preda o introducere pentru un elev nou la ONAA: structura concursului, teme mari, matematica utila si cum abordezi o problema de nivel Senior.",
        topic: "general"
      }
    ]
  },
  {
    id: "senior-problem-warmup",
    title: "Warm-up: prima problema de Seniori",
    kind: "Set de probleme",
    topic: "astrophysics",
    description: "Un set foarte usor de intrare, conceput sa sparga frica de subiectele ONAA.",
    sections: [
      {
        heading: "Problema 1",
        body:
          "Compara perioadele a doua corpuri aflate pe orbite circulare cu raze diferite folosind intuitia legii a III-a a lui Kepler."
      },
      {
        heading: "Problema 2",
        body:
          "Estimeaza raportul de flux pentru o diferenta mica de magnitudine si interpreteaza rezultatul fizic."
      }
    ],
    actions: [
      {
        label: "Rezolva cu Mentorul Astral",
        type: "tutor",
        prompt:
          "Ghideaza-ma printr-o prima problema usoara de nivel Senior ONAA, cu explicatii scurte si verificari de intelegere.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "integrals-foundation",
    title: "Integrale pentru ONAA: intuitie si baza",
    kind: "Lectie de matematica",
    topic: "math",
    description: "Ce este o integrala, de ce apare si cum o poti intelege chiar daca nu ai facut-o bine la scoala.",
    sections: [
      {
        heading: "Ideea centrala",
        body:
          "Integrala aduna contributii foarte mici. O poti vedea ca pe o suma continua: arii, flux, masa distribuita, energie acumulata."
      },
      {
        heading: "De ce conteaza in astrofizica",
        body:
          "Cand aduni lumina care vine din multe regiuni sau calculezi o marime distribuita continuu, integrala apare natural in model."
      }
    ],
    actions: [
      {
        label: "Invata lectia cu AI",
        type: "tutor",
        prompt:
          "Preda o lectie foarte clara despre integrale pentru un elev care nu se simte sigur pe analiza matematica. Foloseste exemple din astrofizica.",
        topic: "stellar_physics"
      }
    ]
  },
  {
    id: "integrals-astrophysics-problem-set",
    title: "Problema usoara ONAA cu integrale",
    kind: "Aplicatie interdisciplinara",
    topic: "math",
    description: "O punte directa intre analiza matematica si astrofizica, cu o problema simplificata tip olimpiada.",
    sections: [
      {
        heading: "Context",
        body:
          "Considera un disc stelar idealizat in care intensitatea depinde simplu de raza. Ideea este sa aduni contributia inelelor subtiri."
      },
      {
        heading: "Pasul ONAA",
        body:
          "Nu urmarim o rezolvare grea, ci formarea reflexului: scrii elementul mic, il insumezi continuu, apoi interpretezi fizic rezultatul."
      }
    ],
    actions: [
      {
        label: "Rezolva problema ghidat",
        type: "tutor",
        prompt:
          "Construieste si rezolva cu mine o problema usoara tip ONAA in care folosesc o integrala simpla pentru o marime astrofizica.",
        topic: "stellar_physics"
      }
    ]
  },
  {
    id: "vectors-orbital-notes",
    title: "Vectori pentru orbite",
    kind: "Fisa de matematica aplicata",
    topic: "math",
    description: "Vectori de pozitie, viteza, acceleratie si legatura lor directa cu forta gravitationala.",
    sections: [
      {
        heading: "Ce fixezi",
        body:
          "Inveti sa vezi forta gravitationala ca vector orientat spre corpul central si sa separi directia vitezei de cea a acceleratiei."
      }
    ],
    actions: [
      {
        label: "Recapituleaza cu AI",
        type: "tutor",
        prompt:
          "Explica vectorii pozitiei, vitezei si acceleratiei in mecanica orbitala, cu exemple foarte simple.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "kepler-problem-set",
    title: "Set Kepler: probleme scurte",
    kind: "Problem set",
    topic: "astrophysics",
    description: "3 probleme scurte care leaga direct matematica de legile lui Kepler.",
    sections: [
      {
        heading: "Structura",
        body:
          "Fiecare problema are un singur focus: proportionalitate, interpretare fizica si comparatii rapide de perioade."
      }
    ],
    actions: [
      {
        label: "Lucreaza setul cu AI",
        type: "tutor",
        prompt:
          "Da-mi 3 probleme scurte pe legile lui Kepler si ghideaza-ma fara sa-mi spui direct raspunsul.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "night-sky-trig",
    title: "Trigonometrie pe cerul noptii",
    kind: "Lectie de astronomie",
    topic: "astronomy",
    description: "Altitudine, azimut, Polaris si orientarea pe bolta pentru observatii reale.",
    sections: [
      {
        heading: "Aplicatie directa",
        body:
          "Coordonatele de pe cer folosesc unghiuri. Trigonometria te ajuta sa interpretezi unghiurile si reperele observationale."
      }
    ],
    actions: [
      {
        label: "Fa lectia cu AI",
        type: "tutor",
        prompt:
          "Preda trigonometria minima de care am nevoie pentru orientarea pe cer, cu exemple din observatii reale.",
        topic: "constellations"
      }
    ]
  },
  {
    id: "celestial-navigation-mini-set",
    title: "Mini set de navigatie cereasca",
    kind: "Aplicatii",
    topic: "astronomy",
    description: "Exercitii simple cu Polaris, Carul Mare, Cassiopeia si repere vizuale.",
    sections: [
      {
        heading: "Antrenament",
        body:
          "Acest set iti formeaza reflexele de orientare astronomica, utile pentru partea observationala si pentru cultura generala astronomica."
      }
    ],
    actions: [
      {
        label: "Exerseaza cu AI",
        type: "tutor",
        prompt:
          "Antreneaza-ma cu 3 exercitii simple de orientare pe cer folosind Polaris, Carul Mare si Cassiopeia.",
        topic: "constellations"
      }
    ]
  },
  {
    id: "derivatives-motion-guide",
    title: "Derivata explicata prin miscare",
    kind: "Lectie de matematica",
    topic: "physics",
    description: "Derivata, explicata intuitiv prin viteza instantanee si acceleratie.",
    sections: [
      {
        heading: "Legatura cu fizica",
        body:
          "Cand vrei sa afli cum se schimba rapid o marime, derivata este instrumentul natural. In fizica, ea apare imediat la viteza si acceleratie."
      }
    ],
    actions: [
      {
        label: "Invata cu AI",
        type: "tutor",
        prompt:
          "Explica derivata foarte intuitiv, apoi arata cum apare in viteza si acceleratie pentru miscarea in spatiu.",
        topic: "orbital_mechanics"
      }
    ]
  },
  {
    id: "motion-foundations",
    title: "Bazele miscarii pentru ONAA",
    kind: "Fizica de baza",
    topic: "physics",
    description: "Recapitulare de mecanica clasica necesara inainte de mecanica orbitala.",
    sections: [
      {
        heading: "Ce trebuie sa stii",
        body:
          "Cinematica, legile lui Newton, energie si impuls. Fara ele, mecanica orbitala devine greu de asezat corect."
      }
    ],
    actions: [
      {
        label: "Recapituleaza cu AI",
        type: "tutor",
        prompt:
          "Fii profesorul meu de fizica si recapituleaza bazele miscarii necesare pentru a intelege mecanica orbitala la ONAA.",
        topic: "orbital_mechanics"
      }
    ]
  }
];

export function getResourceById(resourceId) {
  return libraryResources.find((resource) => resource.id === resourceId) || null;
}
