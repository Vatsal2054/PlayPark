import { createContext } from 'react';
export const UserContext = createContext({
    userInfo: null,
    setUserInfo: () => { },
    searchUsers: async () => [],
});
