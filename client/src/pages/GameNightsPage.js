import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameNightContext } from '@/context/GameNightContext';
import { InvitationContext } from '@/context/InvitationContext';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { HostGameNightModal } from '@/components/modals/HostGameNightModal';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatDate } from '@/helpers/Data/formatDate';
export default function GameNightsPage() {
    const { gameNights: hostedGameNights } = useContext(GameNightContext);
    const { fetchJoinedGameNights } = useContext(InvitationContext);
    const [gameNights, setGameNights] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const isJoinedView = location.pathname.includes('/dashboard/joined-game-nights');
    useEffect(() => {
        if (isJoinedView) {
            fetchJoinedGameNights().then(setGameNights);
        }
        else {
            setGameNights(hostedGameNights);
        }
    }, [isJoinedView, hostedGameNights]);
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold text-gray-900", children: isJoinedView ? "Game Nights You've Joined" : 'Your Game Nights' }), _jsx("p", { className: "text-gray-600 mt-1", children: isJoinedView
                                    ? "All the exciting game nights you're part of"
                                    : 'Manage and organize your hosted game nights' })] }), !isJoinedView && (_jsx(motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, children: _jsx(HostGameNightModal, {}) }))] }), gameNights.length === 0 ? (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "text-center py-16", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDFB2" }), _jsx("h3", { className: "text-xl font-semibold text-gray-900 mb-2", children: isJoinedView
                            ? 'No Game Nights Joined Yet'
                            : 'No Game Nights Created Yet' }), _jsx("p", { className: "text-gray-600 max-w-md mx-auto", children: isJoinedView
                            ? 'Start exploring and join some exciting game nights organized by others!'
                            : 'Create your first game night and start bringing friends together for amazing gaming experiences.' }), !isJoinedView && (_jsx(motion.div, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "mt-6", children: _jsx(HostGameNightModal, {}) }))] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: gameNights.map((gn, index) => (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, whileHover: { y: -4 }, className: "group", children: _jsx(Card, { className: "shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white border-gray-200 hover:border-purple-200 group-hover:ring-1 group-hover:ring-purple-100 p-0", onClick: () => isJoinedView
                            ? navigate(`/dashboard/joined-game-nights/${gn._id}`)
                            : navigate(`/dashboard/game-night/${gn._id}`), children: _jsxs(CardContent, { className: "py-0 p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 group-hover:text-purple-700 transition-colors", children: gn.title }), _jsx("div", { className: "w-2 h-2 bg-green-400 rounded-full flex-shrink-0 mt-2" })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [_jsx(CalendarDays, { className: "w-4 h-4 text-purple-500" }), _jsxs("span", { children: [formatDate(gn.date), " at ", gn.time] })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [_jsx(MapPin, { className: "w-4 h-4 text-purple-500" }), _jsx("span", { className: "truncate", children: gn.location })] }), _jsxs("div", { className: "flex items-center gap-3 text-sm text-gray-600", children: [_jsx(Users, { className: "w-4 h-4 text-purple-500" }), _jsxs("span", { children: [gn.confirmedPlayers?.length ?? 0, " player", gn.confirmedPlayers?.length !== 1 ? 's' : ''] })] })] }), _jsx("div", { className: "pt-2 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300", children: _jsx("p", { className: "text-xs text-purple-600 font-medium", children: "Click to view details \u2192" }) })] }) }) }, gn._id))) }))] }));
}
