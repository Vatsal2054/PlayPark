import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "./context/AuthContext";

// Pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import GameNightsPage from "./pages/GameNightsPage";
import InvitationsPage from "./pages/InvitationsPage";
import GamesPage from "./pages/GamesPage";
import DashboardContent from "./pages/DashboardContent";
import GameNightsDetailPage from "./pages/GameNightsDetailPage";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { pingUser } = useContext(AuthContext);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    pingUser().then(setAuthorized);
  }, []);

  if (authorized === null) return <div>Loading...</div>;
  return authorized ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<LoginPage />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />} />
          <Route path="game-nights" element={<GameNightsPage />} />
          <Route path="game-night/:id" element={<GameNightsDetailPage />} />
          <Route path="games" element={<GamesPage />} />
          <Route path="invitations" element={<InvitationsPage />} />
          <Route path="joined-game-nights" element={<GameNightsPage />} />
          <Route path="joined-game-nights/:id" element={<GameNightsDetailPage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
