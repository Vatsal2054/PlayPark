import { createContext } from 'react';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: 'host' | 'player';
}

export interface UserContextType {
  userInfo: User | null;
  setUserInfo: (user: User | null) => void;
}

export const UserContext = createContext<UserContextType>({
  userInfo: null,
  setUserInfo: () => {},
  searchUsers: async () => [],
});
