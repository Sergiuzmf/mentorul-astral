import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell.jsx";
import { ProtectedRoute } from "./components/ProtectedRoute.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { DashboardPage } from "./pages/DashboardPage.jsx";
import { ConstellationsPage } from "./pages/ConstellationsPage.jsx";
import { LibraryPage } from "./pages/LibraryPage.jsx";
import { LoginPage } from "./pages/LoginPage.jsx";
import { MockTestsPage } from "./pages/MockTestsPage.jsx";
import { RegisterPage } from "./pages/RegisterPage.jsx";
import { ResourcePage } from "./pages/ResourcePage.jsx";
import { SettingsPage } from "./pages/SettingsPage.jsx";
import { StudyAreaPage } from "./pages/StudyAreaPage.jsx";
import { TutorPage } from "./pages/TutorPage.jsx";

function HomeRedirect() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="screen-center" />;
  }

  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/study" element={<StudyAreaPage />} />
          <Route path="/tutor" element={<TutorPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/library/:resourceId" element={<ResourcePage />} />
          <Route path="/mock-tests" element={<MockTestsPage />} />
          <Route path="/constellations" element={<ConstellationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
