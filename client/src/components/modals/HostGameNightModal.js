import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { GameNightContext } from "@/context/GameNightContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Calendar, Clock, MapPin, Sparkles } from "lucide-react";
export function HostGameNightModal() {
    const { createGameNight } = useContext(GameNightContext);
    const [formData, setFormData] = useState({
        title: "",
        date: "",
        time: "",
        location: "",
    });
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async () => {
        const { title, date, time, location } = formData;
        if (!title || !date || !time || !location) {
            toast.error("Please fill out all fields");
            return;
        }
        setLoading(true);
        try {
            await createGameNight(formData);
            toast.success("Game night created successfully!");
            setFormData({ title: "", date: "", time: "", location: "" });
            setOpen(false);
        }
        catch (error) {
            console.log("Error hosting game night:", error);
            toast.error("Failed to create game night");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsx(motion.div, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: _jsxs(Button, { className: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg gap-2", children: [_jsx(Plus, { className: "w-4 h-4" }), "Create Game Night"] }) }) }), _jsx(AnimatePresence, { children: open && (_jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.95 }, transition: { duration: 0.2 }, className: "bg-white/95 backdrop-blur-sm border-0", children: [_jsx(DialogHeader, { className: "pb-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600", children: _jsx(Sparkles, { className: "w-5 h-5 text-white" }) }), _jsx(DialogTitle, { className: "text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent", children: "Host a Game Night" })] }) }), _jsxs("div", { className: "space-y-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "title", className: "text-sm font-medium text-gray-700", children: "Event Title" }), _jsx(Input, { id: "title", name: "title", value: formData.title, onChange: handleChange, placeholder: "Epic Game Night at My Place", className: "border-gray-300 focus:border-purple-500 focus:ring-purple-500" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "date", className: "text-sm font-medium text-gray-700", children: "Event Date" }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "date", name: "date", type: "date", value: formData.date, onChange: handleChange, className: "pl-10 border-gray-300 focus:border-purple-500" })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.3 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "time", className: "text-sm font-medium text-gray-700", children: "Event Time" }), _jsxs("div", { className: "relative", children: [_jsx(Clock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "time", name: "time", type: "time", value: formData.time, onChange: handleChange, className: "pl-10 border-gray-300 focus:border-purple-500" })] })] })] }), _jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", className: "text-sm font-medium text-gray-700", children: "Location" }), _jsxs("div", { className: "relative", children: [_jsx(MapPin, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" }), _jsx(Input, { id: "location", name: "location", value: formData.location, onChange: handleChange, placeholder: "123 Game Street, Fun City", className: "pl-10 border-gray-300 focus:border-purple-500" })] })] }), _jsx(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.5 }, children: _jsx(Button, { className: "w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg mt-2", onClick: handleSubmit, disabled: loading, children: loading ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Loader2, { className: "w-4 h-4 animate-spin" }), _jsx("span", { children: "Creating..." })] })) : (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "w-4 h-4" }), _jsx("span", { children: "Create Game Night" })] })) }) })] })] }) })) })] }));
}
