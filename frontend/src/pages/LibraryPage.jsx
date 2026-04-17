import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";
import { libraryTopics } from "../data/learningExperience.js";
import { getResourceById } from "../data/libraryResources.js";

export function LibraryPage() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    apiRequest("/api/ai/library", { token })
      .then((response) => setLibrary(response.library))
      .catch(() => setLibrary({ spotlightTopic: "orbital_mechanics", completedTopicSuggestion: [], sections: [] }));
  }, [token]);

  function openResource(resourceId) {
    navigate(`/library/${resourceId}`);
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card-animated">
        <div>
          <p className="eyebrow">Biblioteca ONAA</p>
          <h1>Materiale de invatare si recomandari inteligente</h1>
          <p>
            Acum fiecare recomandare se deschide intr-o pagina reala de studiu, iar de acolo poti merge
            mai departe direct in lectii ghidate cu AI-ul.
          </p>
        </div>
        <div className="hero-badge">
          <span>Resurse tematice</span>
          <span>Recomandari dupa progres</span>
          <span>Pagini de continut reale</span>
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Spotlight</p>
            <h2>Urmatoarea tema buna pentru aprofundare</h2>
          </div>
        </div>
        <p>
          Recomandarea actuala merge spre <strong>{library?.spotlightTopic || "orbital_mechanics"}</strong>,
          pe baza profilului tau de invatare si a sesiunilor recente.
        </p>
      </section>

      {library?.completedTopicSuggestion?.length ? (
        <section className="content-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Dupa ce ai lucrat recent</p>
              <h2>AI iti recomanda urmatorul material</h2>
            </div>
          </div>

          <div className="module-grid">
            {library.completedTopicSuggestion.map((item) => {
              const resource = getResourceById(item.id);
              return (
                <article className="module-card floating-card" key={item.id}>
                  <span>{item.type}</span>
                  <h3>{item.title}</h3>
                  <p>{item.note}</p>
                  {resource ? (
                    <button className="ghost-button" type="button" onClick={() => openResource(item.id)}>
                      Deschide resursa
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="module-grid">
        {libraryTopics.map((topic) => (
          <article className="module-card floating-card" key={topic.id}>
            <span>{topic.type}</span>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <ul className="clean-list">
              {topic.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      {library?.sections?.length ? (
        <section className="content-card">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Biblioteca dinamica</p>
              <h2>Recomandari generate dupa topic</h2>
            </div>
          </div>
          <div className="module-grid">
            {library.sections.flatMap((section) =>
              section.items.map((item) => {
                const resource = getResourceById(item.id);
                return (
                  <article className="module-card" key={item.id}>
                    <span>{section.topic}</span>
                    <h3>{item.title}</h3>
                    <p>{item.note}</p>
                    {resource ? (
                      <button className="ghost-button" type="button" onClick={() => openResource(item.id)}>
                        Deschide pagina
                      </button>
                    ) : null}
                  </article>
                );
              })
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}

