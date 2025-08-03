import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
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
function ProtectedRoute({ children }) {
    const { pingUser } = useContext(AuthContext);
    const [authorized, setAuthorized] = useState(null);
    useEffect(() => {
        pingUser().then(setAuthorized);
    }, []);
    if (authorized === null)
        return _jsx("div", { children: "Loading..." });
    return authorized ? children : _jsx(Navigate, { to: "/login" });
}
function App() {
    return (_jsx(Router, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/signup", element: _jsx(LoginPage, {}) }), _jsxs(Route, { path: "/dashboard", element: _jsx(ProtectedRoute, { children: _jsx(DashboardPage, {}) }), children: [_jsx(Route, { index: true, element: _jsx(DashboardContent, {}) }), _jsx(Route, { path: "game-nights", element: _jsx(GameNightsPage, {}) }), _jsx(Route, { path: "game-night/:id", element: _jsx(GameNightsDetailPage, {}) }), _jsx(Route, { path: "games", element: _jsx(GamesPage, {}) }), _jsx(Route, { path: "invitations", element: _jsx(InvitationsPage, {}) }), _jsx(Route, { path: "joined-game-nights", element: _jsx(GameNightsPage, {}) }), _jsx(Route, { path: "joined-game-nights/:id", element: _jsx(GameNightsDetailPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) }));
}
export default App;
