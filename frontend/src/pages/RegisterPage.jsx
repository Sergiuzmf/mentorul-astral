import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export function RegisterPage() {
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    grade: "11",
    targetYear: String(new Date().getFullYear())
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableYears = useMemo(() => {
    const start = new Date().getFullYear();
    return Array.from({ length: 5 }, (_, index) => String(start + index));
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Parolele nu coincid.");
      return;
    }

    setIsSubmitting(true);

    try {
      await register({
        email: form.email,
        password: form.password,
        grade: Number(form.grade),
        targetYear: Number(form.targetYear)
      });
      navigate("/dashboard", { replace: true });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <section className="auth-hero">
        <p className="eyebrow">Inregistrare</p>
        <h1>Construieste-ti contul de studiu</h1>
        <p>
          Alegi clasa actuala si anul ONAA pe care il tintesti, iar aplicatia iti poate
          personaliza ulterior parcursul de invatare.
        </p>
      </section>

      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Create account</h2>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            required
          />
        </label>

        <div className="auth-row">
          <label>
            Clasa curenta
            <select
              value={form.grade}
              onChange={(event) => setForm((current) => ({ ...current, grade: event.target.value }))}
            >
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>

          <label>
            An tinta ONAA
            <select
              value={form.targetYear}
              onChange={(event) => setForm((current) => ({ ...current, targetYear: event.target.value }))}
            >
              {availableYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Password
          <input
            type="password"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
            minLength={8}
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
            required
            minLength={8}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="primary-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Se creeaza contul..." : "Creeaza cont"}
        </button>

        <p className="form-switch">
          Ai deja cont? <Link to="/login">Mergi la login</Link>
        </p>
      </form>
    </div>
  );
}
