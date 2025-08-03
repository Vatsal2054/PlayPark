import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameContext } from '@/context/GameContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { toast } from 'react-hot-toast';
import { Loader2, Plus, Gamepad2, Users } from 'lucide-react';
export function AddGameModal() {
    const { addGame } = useContext(GameContext);
    const [gameData, setGameData] = useState({
        title: '',
        type: 'board',
        minPlayers: '',
        maxPlayers: '',
        complexity: 'easy',
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setGameData({ ...gameData, [e.target.name]: e.target.value });
    };
    const handleSelectChange = (field, value) => {
        setGameData({ ...gameData, [field]: value });
    };
    const handleSubmit = async () => {
        const { title, type, minPlayers, maxPlayers, complexity } = gameData;
        if (!title || !type || !minPlayers || !maxPlayers || !complexity) {
            toast.error('All fields are required');
            return;
        }
        setLoading(true);
        try {
            await addGame({
                ...gameData,
                minPlayers: Number(minPlayers),
                maxPlayers: Number(maxPlayers),
            });
            toast.success('Game added successfully!');
            setOpen(false);
            setGameData({
                title: '',
                type: 'board',
                minPlayers: '',
                maxPlayers: '',
                complexity: 'easy',
            });
        }
        catch (err) {
            console.log(err);
            toast.error('Failed to add game');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), "Add Game"] }) }) }), _jsx(AnimatePresence, { children: open && (_jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 }, className: "bg-white/95 backdrop-blur-sm border-0", children: [_jsx(DialogHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600", children: _jsx(Gamepad2, { className: "w-5 h-5 text-white" }) }), _jsx(DialogTitle, { className: "text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent", children: "Add New Game" })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", className: "text-sm font-medium text-gray-700", children: "Game Title" }), _jsx(Input, { id: "title", name: "title", value: gameData.title, onChange: handleChange, placeholder: "Enter game name...", className: "border-gray-300 focus:border-purple-500 focus:ring-purple-500" })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "type", className: "text-sm font-medium text-gray-700", children: "Game Type" }), _jsxs(Select, { value: gameData.type, onValueChange: (value) => handleSelectChange('type', value), children: [_jsx(SelectTrigger, { id: "type", className: "border-gray-300 focus:border-purple-500", children: _jsx(SelectValue, { placeholder: "Select type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "board", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\uD83C\uDFB2" }), _jsx("span", { children: "Board Game" })] }) }), _jsx(SelectItem, { value: "video", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\uD83C\uDFAE" }), _jsx("span", { children: "Video Game" })] }) }), _jsx(SelectItem, { value: "rpg", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "\u2694\uFE0F" }), _jsx("span", { children: "RPG" })] }) })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "minPlayers", className: "text-sm font-medium text-gray-700", children: "Min Players" }), _jsxs("div", { className: "relative", children: [_jsx(Users, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "minPlayers", name: "minPlayers", type: "number", min: "1", value: gameData.minPlayers, onChange: handleChange, placeholder: "2", className: "pl-10 border-gray-300 focus:border-purple-500" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "maxPlayers", className: "text-sm font-medium text-gray-700", children: "Max Players" }), _jsxs("div", { className: "relative", children: [_jsx(Users, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "maxPlayers", name: "maxPlayers", type: "number", min: "1", value: gameData.maxPlayers, onChange: handleChange, placeholder: "6", className: "pl-10 border-gray-300 focus:border-purple-500" })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "complexity", className: "text-sm font-medium text-gray-700", children: "Complexity Level" }), _jsxs(Select, { value: gameData.complexity, onValueChange: (value) => handleSelectChange('complexity', value), children: [_jsx(SelectTrigger, { id: "complexity", className: "border-gray-300 focus:border-purple-500", children: _jsx(SelectValue, { placeholder: "Select complexity" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "easy", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-green-500 rounded-full" }), _jsx("span", { children: "Easy" })] }) }), _jsx(SelectItem, { value: "medium", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-amber-500 rounded-full" }), _jsx("span", { children: "Medium" })] }) }), _jsx(SelectItem, { value: "hard", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-2 h-2 bg-red-500 rounded-full" }), _jsx("span", { children: "Hard" })] }) })] })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.6 }, children: _jsx(Button, { className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg mt-2", onClick: handleSubmit, disabled: loading, children: loading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Loader2, { className: "h-4 w-4 animate-spin" }), _jsx("span", { children: "Adding Game..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Add Game" })] })) }) })] })] }) })) })] }));
}
