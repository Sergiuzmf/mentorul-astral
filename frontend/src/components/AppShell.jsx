import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { AIChatWidget } from "./AIChatWidget.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/study", label: "Academia ONAA" },
  { to: "/tutor", label: "Mentorul Astral" },
  { to: "/library", label: "Biblioteca" },
  { to: "/mock-tests", label: "Adaptive Tests" },
  { to: "/constellations", label: "Atlasul Cerului" },
  { to: "/settings", label: "Goals & AI" }
];

export function AppShell() {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="app-shell">
        <aside className="sidebar">
          <Link className="brand-card" to="/dashboard">
            <p className="eyebrow">AstroAI - Pregatire ONAA</p>
            <h1>Mentorul Astral</h1>
            <p>
              Inteligenta artificiala pentru invatare activa, explicatii adaptive si
              mock tests personalizate.
            </p>
          </Link>

          <div className="profile-card">
            <p className="eyebrow">Profil elev</p>
            <h2>{user?.email}</h2>
            <div className="profile-grid">
              <span>Clasa {user?.grade}</span>
              <span>ONAA {user?.targetYear}</span>
              <span>Nivel {user?.skillLevel}</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink key={item.to} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} to={item.to}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button className="ghost-button" type="button" onClick={logout}>
            Logout
          </button>
        </aside>

        <main className="main-panel">
          <Outlet />
        </main>
      </div>

      <AIChatWidget />
    </>
  );
}
