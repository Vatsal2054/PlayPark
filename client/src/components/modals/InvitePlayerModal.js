import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserContext } from '@/context/UserContext';
import { InvitationContext } from '@/context/InvitationContext';
import { toast } from 'react-hot-toast';
import { Loader2, Search, UserPlus, Send, Users } from 'lucide-react';
export function InvitePlayerModal({ gameNightId }) {
    const { searchUsers } = useContext(UserContext);
    const { sendInvitation } = useContext(InvitationContext);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [inviting, setInviting] = useState(null);
    const [open, setOpen] = useState(false);
    const handleSearch = async () => {
        if (!query.trim()) {
            toast.error('Please enter a username to search');
            return;
        }
        setLoading(true);
        try {
            const res = await searchUsers(query);
            if (res.status === 200) {
                setResults(res.data);
                if (res.data.length === 0) {
                    toast.error('No users found');
                }
            }
            else {
                toast.error('Failed to search users');
            }
        }
        catch (error) {
            toast.error('Search failed');
        }
        finally {
            setLoading(false);
        }
    };
    const invite = async (receiverId) => {
        setInviting(receiverId);
        try {
            await sendInvitation({ receiverId, gameNightId });
            toast.success('Invitation sent successfully!');
            setResults(results.filter((user) => user._id !== receiverId));
        }
        catch (error) {
            toast.error('Failed to send invitation');
        }
        finally {
            setInviting(null);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { variant: "outline", className: "border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), "Invite Players"] }) }) }), _jsx(AnimatePresence, { children: open && (_jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 }, className: "bg-white/95 backdrop-blur-sm border-0", children: [_jsx(DialogHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600", children: _jsx(Users, { className: "w-5 h-5 text-white" }) }), _jsx(DialogTitle, { className: "text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent", children: "Invite Players" })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "space-y-3", children: [_jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { placeholder: "Search by username...", value: query, onChange: (e) => setQuery(e.target.value), onKeyDown: handleKeyPress, className: "pl-10 border-gray-300 focus:border-purple-500" })] }), _jsx(Button, { onClick: handleSearch, disabled: loading || !query.trim(), className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white", children: loading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Loader2, { className: "animate-spin w-4 h-4" }), _jsx("span", { children: "Searching..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Search, { className: "w-4 h-4" }), _jsx("span", { children: "Search Users" })] })) })] }), _jsx(AnimatePresence, { children: results.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "space-y-3", children: [_jsxs("h4", { className: "text-sm font-medium text-gray-700 flex items-center gap-2", children: [_jsx(Users, { className: "w-4 h-4 text-purple-600" }), "Search Results (", results.length, ")"] }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: results.map((user, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:border-purple-200 hover:bg-purple-50/50 transition-all duration-200", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white font-semibold text-sm", children: user.username[0].toUpperCase() }) }), _jsx("span", { className: "font-medium text-gray-900", children: user.username })] }), _jsx(Button, { size: "sm", onClick: () => invite(user._id), disabled: inviting === user._id, className: "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0", children: inviting === user._id ? (_jsx(Loader2, { className: "animate-spin w-4 h-4" })) : (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Send, { className: "w-3 h-3" }), _jsx("span", { children: "Invite" })] })) })] }, user._id))) })] })) }), !loading && results.length === 0 && query && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "text-center py-8", children: [_jsx(Users, { className: "w-12 h-12 text-gray-300 mx-auto mb-3" }), _jsx("p", { className: "text-gray-500", children: "Start searching to find players to invite!" })] }))] })] }) })) })] }));
}
