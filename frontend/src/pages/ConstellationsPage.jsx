import { useEffect, useState } from "react";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { ConstellationMap } from "../components/ConstellationMap.jsx";
import { localConstellations } from "../data/constellations.js";
import { deepSkyHighlights } from "../data/learningExperience.js";

export function ConstellationsPage() {
  const { token } = useAuth();
  const [constellations, setConstellations] = useState(localConstellations);
  const [selected, setSelected] = useState(localConstellations[0] || null);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    apiRequest("/api/ai/constellations", { token })
      .then((response) => {
        if (response?.constellations?.length) {
          setConstellations(response.constellations);
          setSelected(response.constellations[0]);
          setLoadError("");
        }
      })
      .catch(() => {
        setConstellations(localConstellations);
        setSelected(localConstellations[0] || null);
        setLoadError("Am incarcat atlasul local. Viewerul principal poate functiona independent.");
      });
  }, [token]);

  const bucharestHint =
    new Date().getMonth() >= 9 || new Date().getMonth() <= 2
      ? "Cer de seara: Orion, Pleiadele si M31 sunt repere excelente in sezonul rece."
      : "Cer de seara: Ursa Mare, Cassiopeia si stelele de vara te ajuta sa te orientezi repede.";

  return (
    <div className="page-stack">
      <section className="hero-card hero-card-animated">
        <div>
          <p className="eyebrow">Atlasul Cerului</p>
          <h1>Cerul real, plus ghidaj pentru ONAA</h1>
          <p>{bucharestHint}</p>
        </div>
        <div className="hero-badge">
          <span>{"Bucuresti 44.4\u00B0N"}</span>
          <span>Constelatii + obiecte deep-sky</span>
          <span>Sky Atlas embed</span>
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Night Sky Viewer</p>
            <h2>Atlas interactiv al cerului</h2>
          </div>
        </div>
        <div className="sky-atlas-frame">
          <iframe
            title="Aladin Lite Sky Atlas"
            src="https://aladin.cds.unistra.fr/AladinLite/"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
        <p className="muted-copy">
          Viewerul folosit este bazat pe Aladin Lite, un atlas al cerului embeddable cu API oficial.
          Daca iframe-ul nu se incarca intr-un anumit browser, ghidul local de mai jos ramane disponibil.
        </p>
      </section>

      {loadError ? (
        <section className="content-card">
          <p className="form-error">{loadError}</p>
        </section>
      ) : null}

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Dincolo de constelatii</p>
            <h2>Obiecte ceresti importante pentru cultura astronomica</h2>
          </div>
        </div>
        <div className="module-grid">
          {deepSkyHighlights.map((item) => (
            <article className="module-card floating-card" key={item.name}>
              <span>{item.category}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="muted-copy">
                Intreaba AI-ul: <strong>{item.prompt}</strong>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="module-grid">
        {constellations.map((constellation) => (
          <button
            className={`module-card constellation-card ${selected?.id === constellation.id ? "selected" : ""}`}
            key={constellation.id}
            type="button"
            onClick={() => setSelected(constellation)}
          >
            <h3>{constellation.name}</h3>
            <p>{constellation.story}</p>
          </button>
        ))}
      </section>

      {selected ? (
        <section className="content-card constellation-layout">
          <div>
            <h2>{selected.name}</h2>
            <p>{selected.story}</p>
            <div className="night-sky-facts">
              <span>Vizibil din Bucuresti</span>
              <span>Stele principale marcate</span>
              <span>Reper pentru orientare</span>
            </div>
            <p className="muted-copy">
              Pentru explicatie detaliata in stil de profesor, deschide Mentorul Astral si cere:
              <br />
              <strong>{selected.aiPrompt}</strong>
            </p>
          </div>
          <ConstellationMap constellation={selected} />
        </section>
      ) : null}
    </div>
  );
}

