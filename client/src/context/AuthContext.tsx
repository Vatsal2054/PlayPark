import { createContext } from 'react';

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    credentials: LoginCredentials;
    setCredentials: (creds: LoginCredentials) => void;
    loginUser: () => Promise<boolean>;
    signUpUser: (creds: SignUpCredentials) => Promise<boolean>;
    googleLogin: () => void;
    pingUser: () => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    credentials: { email: '', password: '' },
    setCredentials: () => {},
    loginUser: async () => false,
    signUpUser: async () => false,
    pingUser: async () => false,
    logout: async () => false,
});
