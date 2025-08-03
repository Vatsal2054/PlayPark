import { createContext } from 'react';
export const AuthContext = createContext({
    isAuthenticated: false,
    credentials: { email: '', password: '' },
    setCredentials: () => { },
    loginUser: async () => false,
    signUpUser: async () => false,
    pingUser: async () => false,
    logout: async () => false,
});
