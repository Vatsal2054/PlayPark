import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useContext, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { UserContext } from './UserContext';
import postApi from '../helpers/API/postApi';
import getApi from '../helpers/API/getApi';
import toast from 'react-hot-toast';
export default function AuthContextProvider({ children }) {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    async function loginUser() {
        const res = await postApi('/auth/login', credentials);
        if (res.status === 200) {
            toast.success('User Logged in Successfully');
            setIsAuthenticated(true);
            return true;
        }
        toast.error('Login failed');
        return false;
    }
    async function signUpUser(signUpCredentials) {
        const res = await postApi('/auth/register', signUpCredentials);
        console.log('Signed Up Response:', res.data);
        if (res.status === 200) {
            toast.success('User Signed Up Successfully');
            return true;
        }
        return false;
    }
    async function pingUser() {
        if (!isAuthenticated)
            return false;
        const res = await getApi('/auth/');
        console.log('Ping User Response:', res.data);
        if (res.status === 200) {
            setUserInfo(res.data.user);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }
    const logout = async () => {
        const res = await postApi('/auth/logout');
        if (res.status === 200) {
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('token'); // or any local storage state
            navigate('/login');
        }
    };
    return (_jsx(AuthContext.Provider, { value: {
            isAuthenticated,
            credentials,
            setCredentials,
            loginUser,
            signUpUser,
            pingUser,
            logout,
        }, children: children }));
}
