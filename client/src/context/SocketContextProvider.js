import { jsx as _jsx } from "react/jsx-runtime";
import { ReactNode, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext';
import { io, Socket } from 'socket.io-client';
import apiInfo from '@/helpers/API/apiInfo';
export default function SocketContextProvider({ children }) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(apiInfo.URL, {
            withCredentials: true,
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);
    return (_jsx(SocketContext.Provider, { value: { socket }, children: children }));
}
