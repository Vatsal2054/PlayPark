import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
export default function AuthPage() {
    const { credentials, setCredentials, loginUser, signUpUser } = useContext(AuthContext);
    const location = useLocation();
    const [isSignUp, setIsSignUp] = useState(location.pathname === '/signup');
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    useEffect(() => {
        setIsSignUp(location.pathname === '/signup');
    }, [location.pathname]);
    const navigate = useNavigate();
    const handleLogin = async () => {
        const success = await loginUser();
        if (success) {
            navigate('/dashboard');
        }
    };
    const handleSignUp = async () => {
        if (signUpData.password !== signUpData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        const signUpCredentials = {
            username: `${signUpData.firstName} ${signUpData.lastName}`,
            email: signUpData.email,
            password: signUpData.password,
        };
        const success = await signUpUser(signUpCredentials);
        if (success) {
            // Switch to login mode after successful signup
            navigate('/login');
            setIsSignUp(false);
        }
    };
    return (_jsx("main", { className: "h-screen flex items-center justify-center bg-muted", children: _jsxs("div", { className: "w-full h-full bg-white rounded-xl shadow-md overflow-hidden flex md:flex-row flex-col", children: [_jsx("div", { className: "p-10 flex flex-col justify-center flex-1", children: _jsxs("div", { className: "max-w-[70%] mx-auto w-full", children: [_jsx("h1", { className: "text-4xl font-[800] mb-2", children: isSignUp ? (_jsxs(_Fragment, { children: ["Hey,", _jsx("br", {}), "Create Account"] })) : (_jsxs(_Fragment, { children: ["Holla,", _jsx("br", {}), "Welcome Back"] })) }), _jsx("p", { className: "text-muted-foreground text-lg mb-6", children: isSignUp
                                    ? 'Join our community and start your journey'
                                    : 'Hey, welcome back to your special place' }), _jsxs("div", { className: "space-y-4", children: [isSignUp && (_jsx(_Fragment, { children: _jsxs("div", { className: "flex gap-4", children: [_jsxs("div", { className: "flex flex-col gap-2 flex-1", children: [_jsx(Label, { htmlFor: "firstName", children: "First Name" }), _jsx(Input, { id: "firstName", type: "text", placeholder: "John", value: signUpData.firstName, onChange: (e) => setSignUpData({
                                                                ...signUpData,
                                                                firstName: e.target.value,
                                                            }) })] }), _jsxs("div", { className: "flex flex-col gap-2 flex-1", children: [_jsx(Label, { htmlFor: "lastName", children: "Last Name" }), _jsx(Input, { id: "lastName", type: "text", placeholder: "Doe", value: signUpData.lastName, onChange: (e) => setSignUpData({
                                                                ...signUpData,
                                                                lastName: e.target.value,
                                                            }) })] })] }) })), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsx(Input, { id: "email", type: "email", placeholder: "startey@gmail.com", value: isSignUp ? signUpData.email : credentials.email, onChange: (e) => {
                                                    if (isSignUp) {
                                                        setSignUpData({ ...signUpData, email: e.target.value });
                                                    }
                                                    else {
                                                        setCredentials({ ...credentials, email: e.target.value });
                                                    }
                                                } })] }), _jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "password", children: "Password" }), _jsx(Input, { id: "password", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: isSignUp ? signUpData.password : credentials.password, onChange: (e) => {
                                                    if (isSignUp) {
                                                        setSignUpData({
                                                            ...signUpData,
                                                            password: e.target.value,
                                                        });
                                                    }
                                                    else {
                                                        setCredentials({
                                                            ...credentials,
                                                            password: e.target.value,
                                                        });
                                                    }
                                                } })] }), isSignUp && (_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }), _jsx(Input, { id: "confirmPassword", type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", value: signUpData.confirmPassword, onChange: (e) => setSignUpData({
                                                    ...signUpData,
                                                    confirmPassword: e.target.value,
                                                }) })] })), !isSignUp && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "remember" }), _jsx(Label, { htmlFor: "remember", children: "Remember me" })] }), _jsx(Link, { to: "/forgot-password", className: "text-sm text-purple-600 hover:underline", children: "Forgot Password?" })] })), isSignUp && (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsxs(Label, { htmlFor: "terms", className: "text-sm", children: ["I agree to the", ' ', _jsx(Link, { to: "/terms", className: "text-purple-600 hover:underline", children: "Terms of Service" }), ' ', "and", ' ', _jsx(Link, { to: "/privacy", className: "text-purple-600 hover:underline", children: "Privacy Policy" })] })] })), _jsx(Button, { className: "w-full bg-purple-600 hover:bg-purple-700 text-white mt-2 cursor-pointer", onClick: isSignUp ? handleSignUp : handleLogin, children: isSignUp ? 'Create Account' : 'Sign In' }), _jsxs("p", { className: "text-center text-[.9rem] text-muted-foreground", children: [isSignUp
                                                ? 'Already have an account?'
                                                : "Don't have an account?", ' ', _jsx("button", { onClick: () => isSignUp ? navigate('/login') : navigate('/signup'), className: "text-purple-600 hover:underline", children: isSignUp ? 'Sign In' : 'Sign Up' })] })] })] }) }), _jsx("div", { className: "hidden md:block flex-1 relative", children: _jsx("div", { className: "absolute inset-4 bg-cover bg-center rounded-xl", style: {
                            backgroundImage: `url('/login.png')`,
                        } }) })] }) }));
}
