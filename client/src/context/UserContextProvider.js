import { jsx as _jsx } from "react/jsx-runtime";
import { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';
import getApi from '../helpers/API/getApi';
export default function UserContextProvider({ children }) {
    const [userInfo, setUserInfo] = useState(null);
    const searchUsers = async (query) => {
        return await getApi(`/users/search?query=${query}`);
    };
    return (_jsx(UserContext.Provider, { value: { userInfo, setUserInfo, searchUsers }, children: children }));
}
