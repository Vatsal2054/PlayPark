import { useState, useEffect, ReactNode, useContext } from 'react';
import { GameContext } from './GameContext';
import type { Game } from './GameContext';
import getApi from '../helpers/API/getApi';
import postApi from '../helpers/API/postApi';
import toast from 'react-hot-toast';
import { AuthContext } from './AuthContext';

interface Props {
    children: ReactNode;
}

export default function GameContextProvider({ children }: Props) {
    const [games, setGames] = useState<Game[]>([]);
    const { isAuthenticated } = useContext(AuthContext);

    const fetchGames = async () => {
        if(!isAuthenticated) return;
        const res = await getApi('/games');
        if (res.status === 200) {
            setGames(res.data);
        }
    };
    
    const addGame = async (game: Game) => {
        if(!isAuthenticated) return;
        const res = await postApi('/games', game);
        if (res.status === 201) {
            toast.success('Game added!');
            fetchGames();
        }
    };
    
    useEffect(() => {
        if(!isAuthenticated) return;
        fetchGames();
    }, [isAuthenticated]);
    
    return (
        <GameContext.Provider value={{ games, fetchGames, addGame }}>
            {children}
        </GameContext.Provider>
    );
}
