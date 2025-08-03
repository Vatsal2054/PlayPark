import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, ReactNode, useContext } from 'react';
import { GameNightContext } from './GameNightContext';
import getApi from '../helpers/API/getApi';
import postApi from '../helpers/API/postApi';
import toast from 'react-hot-toast';
import { SocketContext } from './SocketContext';
import { AuthContext } from './AuthContext';
export default function GameNightContextProvider({ children }) {
    const [gameNights, setGameNights] = useState([]);
    const { socket } = useContext(SocketContext);
    const { isAuthenticated } = useContext(AuthContext);
    const fetchGameNights = async () => {
        if (!isAuthenticated)
            return;
        const res = await getApi('/gamenights');
        if (res.status === 200) {
            console.log('Fetched Game Nights:', res.data);
            setGameNights(res.data);
        }
    };
    const createGameNight = async (data) => {
        if (!isAuthenticated)
            return;
        const res = await postApi('/gamenights', data);
        if (res.status === 201) {
            toast.success('Game Night Created');
        }
        else {
            toast.error('Failed to create Game Night');
        }
    };
    async function getGameNightById(id) {
        if (!isAuthenticated)
            return null;
        const res = await getApi(`/gamenights/${id}`);
        if (res.status === 200) {
            return res.data;
        }
        else {
            console.error('Failed to fetch game night', res);
            return null;
        }
    }
    useEffect(() => {
        if (!isAuthenticated)
            return;
        fetchGameNights();
        if (!socket)
            return;
        socket.on('gameNightCreated', (newNight) => {
            // toast.success(`New Game Night: ${newNight.title}`);
            setGameNights((prev) => [...prev, newNight]);
        });
        return () => {
            socket.off('gameNightCreated');
        };
    }, [socket, isAuthenticated]);
    return (_jsx(GameNightContext.Provider, { value: { gameNights, fetchGameNights, createGameNight, getGameNightById }, children: children }));
}
