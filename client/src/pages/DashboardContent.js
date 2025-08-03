import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GameNightContext } from '@/context/GameNightContext';
import { InvitationContext } from '@/context/InvitationContext';
import { Gamepad2, Library, UsersRound, CalendarDays, Users, ChevronRight, Sparkles, } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
// Enhanced Dashboard Content Component
export default function DashboardContent() {
    const { gameNights } = useContext(GameNightContext);
    const { invitations } = useContext(InvitationContext);
    const stats = [
        {
            title: 'Game Nights Hosted',
            value: gameNights.length,
            icon: CalendarDays,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            delay: 0.1,
        },
        {
            title: 'Confirmed Players',
            value: gameNights.reduce((total, gn) => total + (gn.confirmedPlayers?.length || 0), 0),
            icon: Users,
            color: 'from-indigo-500 to-indigo-600',
            bgColor: 'bg-indigo-50',
            delay: 0.2,
        },
        {
            title: 'Pending Invitations',
            value: invitations.length,
            icon: Gamepad2,
            color: 'from-violet-500 to-violet-600',
            bgColor: 'bg-violet-50',
            delay: 0.3,
        },
    ];
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-center py-8", children: [_jsx("div", { className: "flex items-center justify-center gap-2 mb-4", children: _jsx("h1", { className: "text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent", children: "Welcome to PlayPark" }) }), _jsx("p", { className: "text-gray-600 max-w-2xl mx-auto", children: "Organize amazing game nights, connect with friends, and create unforgettable gaming experiences." })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: stat.delay }, whileHover: { y: -4 }, className: "group", children: _jsx(Card, { className: "border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm", children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("div", { className: `p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`, children: [_jsx(IconComponent, { className: "h-6 w-6 text-purple-600" }), ' '] }), _jsxs("div", { className: "flex-1", children: [_jsx(motion.h2, { className: "text-2xl font-bold text-gray-900", initial: { scale: 1 }, whileHover: { scale: 1.05 }, children: stat.value }), _jsx("p", { className: "text-sm text-gray-600 font-medium", children: stat.title })] })] }) }) }) }, stat.title));
                }) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "mt-12", children: [_jsx("h2", { className: "text-xl font-semibold text-gray-900 mb-6", children: "Quick Actions" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
                            {
                                name: 'Create Game Night',
                                path: '/dashboard/game-nights',
                                icon: CalendarDays,
                            },
                            { name: 'Browse Games', path: '/dashboard/games', icon: Library },
                            {
                                name: 'View Invitations',
                                path: '/dashboard/invitations',
                                icon: UsersRound,
                            },
                            {
                                name: 'Join Events',
                                path: '/dashboard/joined-game-nights',
                                icon: Users,
                            },
                        ].map((action, index) => {
                            const IconComponent = action.icon;
                            return (_jsx(Link, { to: action.path, children: _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, className: "p-4 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 hover:border-purple-200 transition-all duration-300 group", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(IconComponent, { className: "h-5 w-5 text-purple-600 group-hover:scale-110 transition-transform" }), _jsx("span", { className: "font-medium text-gray-900", children: action.name }), _jsx(ChevronRight, { className: "h-4 w-4 text-gray-400 ml-auto group-hover:translate-x-1 transition-transform" })] }) }) }, action.name));
                        }) })] })] }));
}
