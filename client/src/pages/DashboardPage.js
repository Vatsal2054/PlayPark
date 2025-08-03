import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '@/context/UserContext';
import { Popover, PopoverContent, PopoverTrigger, } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Gamepad2, Home, Library, UsersRound, Users, LogOut, User, } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
export default function DashboardPage() {
    const { userInfo } = useContext(UserContext);
    const { logout } = useContext(AuthContext);
    const location = useLocation();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const navItems = [
        {
            path: '/dashboard',
            name: 'Dashboard',
            icon: Home,
        },
        {
            path: '/dashboard/games',
            name: 'My Games',
            icon: Library,
        },
        {
            path: '/dashboard/game-nights',
            name: 'Game Nights',
            icon: Gamepad2,
        },
        {
            path: '/dashboard/invitations',
            name: 'Invitations',
            icon: UsersRound,
        },
        {
            path: '/dashboard/joined-game-nights',
            name: 'Joined Game Nights',
            icon: Users,
        },
    ];
    const handleLogout = () => {
        // Add your logout logic here
        logout();
        console.log('Logging out...');
        setIsPopoverOpen(false);
    };
    return (_jsxs("div", { className: "flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30", children: [_jsxs(motion.aside, { initial: { x: -300 }, animate: { x: 0 }, className: "w-64 bg-white/90 backdrop-blur-sm shadow-xl border-r border-gray-200/50", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, className: "p-6 border-b border-gray-100", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500", children: _jsx(Gamepad2, { className: "h-6 w-6 text-white" }) }), _jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent", children: "PlayPark" })] }) }), _jsx("nav", { className: "flex flex-col gap-1 p-4", children: navItems.map((item, index) => {
                            const IconComponent = item.icon;
                            const isActive = location.pathname === item.path;
                            return (_jsx(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: 0.1 * index }, children: _jsxs(Link, { to: item.path, className: `flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden
    ${isActive
                                        ? 'text-white shadow-lg'
                                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700'}`, children: [isActive && (_jsx(motion.div, { layoutId: "activeTab", className: "absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl", initial: false, transition: {
                                                type: 'spring',
                                                bounce: 0.2,
                                                duration: 0.6,
                                            } })), _jsx(IconComponent, { className: `h-5 w-5 transition-transform duration-300 group-hover:scale-110 relative z-10 ${isActive
                                                ? 'text-white'
                                                : 'text-gray-500 group-hover:text-purple-600'}` }), _jsx("span", { className: "relative z-10", children: item.name })] }) }, item.path));
                        }) }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.6 }, className: "absolute bottom-4 left-4 right-4", children: _jsx("div", { className: "p-3 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100", children: _jsx("p", { className: "text-xs text-gray-600 text-center", children: "\uD83C\uDFAE Level up your game nights!" }) }) })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs(motion.header, { initial: { y: -50, opacity: 0 }, animate: { y: 0, opacity: 1 }, className: "bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 flex justify-between items-center shadow-sm", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-xl font-semibold text-gray-900", children: userInfo?.username
                                            ? `Hello, ${userInfo.username}!`
                                            : 'Welcome back!' }), _jsx("p", { className: "text-sm text-gray-600", children: "Ready for your next gaming adventure?" })] }), _jsxs(Popover, { open: isPopoverOpen, onOpenChange: setIsPopoverOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(motion.button, { whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, className: "relative", children: [_jsx(Avatar, { className: "h-10 w-10 ring-2 ring-purple-200 hover:ring-purple-300 transition-all duration-300", children: _jsx(AvatarFallback, { className: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold", children: userInfo?.username?.[0]?.toUpperCase() ?? 'U' }) }), _jsx("div", { className: "absolute -top-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white" })] }) }), _jsx(AnimatePresence, { children: isPopoverOpen && (_jsx(PopoverContent, { className: "w-64 p-0 border-0 rounded-xl overflow-hidden mr-4 shadow-xl bg-white/95 backdrop-blur-sm", sideOffset: 8, asChild: true, children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: -10 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: -10 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "p-4 bg-gradient-to-r from-purple-50 to-indigo-50", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Avatar, { className: "h-12 w-12", children: _jsx(AvatarFallback, { className: "bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold text-lg", children: userInfo?.username?.[0]?.toUpperCase() ?? 'U' }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "font-semibold text-gray-900 truncate", children: userInfo?.username ?? 'Guest User' }), _jsx("p", { className: "text-sm text-gray-600 truncate", children: userInfo?.email ?? 'guest@playpark.com' })] })] }) }), _jsx(Separator, {}), _jsx("div", { className: "p-2", children: _jsxs(Button, { variant: "ghost", className: "w-full justify-start gap-3 h-auto p-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200", onClick: handleLogout, children: [_jsx(LogOut, { className: "h-4 w-4" }), _jsx("span", { children: "Logout" })] }) })] }) })) })] })] }), _jsx("main", { className: "p-6 flex-1 overflow-y-auto", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, children: _jsx(Outlet, {}) }) })] })] }));
}
