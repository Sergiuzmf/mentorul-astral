import { Link, useNavigate, useParams } from "react-router-dom";
import { getResourceById } from "../data/libraryResources.js";

export function ResourcePage() {
  const navigate = useNavigate();
  const { resourceId } = useParams();
  const resource = getResourceById(resourceId);

  if (!resource) {
    return (
      <div className="page-stack">
        <section className="content-card">
          <h1>Resursa nu a fost gasita</h1>
          <Link className="ghost-button" to="/library">
            Inapoi la Biblioteca
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="hero-card hero-card-animated">
        <div>
          <p className="eyebrow">{resource.kind}</p>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
        </div>
        <div className="hero-badge">
          <span>{resource.topic}</span>
          <span>Biblioteca ONAA</span>
        </div>
      </section>

      <section className="content-card">
        <div className="stack-sm">
          {resource.sections.map((section) => (
            <article className="module-card floating-card" key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-card">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Actiuni</p>
            <h2>Ce faci mai departe</h2>
          </div>
        </div>
        <div className="chip-row">
          {resource.actions.map((action) => (
            <button
              key={action.label}
              className="primary-button"
              type="button"
              onClick={() =>
                navigate("/tutor", {
                  state: {
                    initialPrompt: action.prompt,
                    initialTopic: action.topic
                  }
                })
              }
            >
              {action.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

