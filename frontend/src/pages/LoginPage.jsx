import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || "/dashboard";

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="eyebrow">Autentificare</p>
        <h1>Intra in zona ta de pregatire ONAA</h1>
        <p>
          Urmareste progresul, revino la mock tests si construieste un ritm de studiu
          coerent pentru astronomie si astrofizica.
        </p>
      </section>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Se autentifica..." : "Intra in cont"}
        </button>

        <p className="form-switch">
          Nu ai cont? <Link to="/register">Creeaza unul aici</Link>
        </p>
      </form>
    </div>
  );
}
