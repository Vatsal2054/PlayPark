import { useState, useEffect, ReactNode, useContext } from 'react';
import { GameNightContext } from './GameNightContext';
import type { GameNight } from '../types/GameNight';
import getApi from '../helpers/API/getApi';
import postApi from '../helpers/API/postApi';
import toast from 'react-hot-toast';
import { SocketContext } from './SocketContext';
import { AuthContext } from './AuthContext';

interface Props {
  children: ReactNode;
}

export default function GameNightContextProvider({ children }: Props) {
  const [gameNights, setGameNights] = useState<GameNight[]>([]);
  const { socket } = useContext(SocketContext);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchGameNights = async () => {
    if (!isAuthenticated) return;
    const res = await getApi('/gamenights');

    if (res.status === 200) {
      console.log('Fetched Game Nights:', res.data);
      setGameNights(res.data as GameNight[]);
    }
  };

  const createGameNight = async (data: GameNight) => {
    if (!isAuthenticated) return;
    const res = await postApi('/gamenights', data);
    if (res.status === 201) {
      toast.success('Game Night Created');
    } else {
      toast.error('Failed to create Game Night');
    }
  };

  async function getGameNightById(id: string): Promise<GameNight | null> {
    if (!isAuthenticated) return null;
    const res = await getApi(`/gamenights/${id}`);
    if (res.status === 200) {
      return res.data as GameNight;
    } else {
      console.error('Failed to fetch game night', res);
      return null;
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchGameNights();

    if (!socket) return;

    socket.on('gameNightCreated', (newNight: GameNight) => {
      // toast.success(`New Game Night: ${newNight.title}`);
      setGameNights((prev) => [...prev, newNight]);
    });

    return () => {
      socket.off('gameNightCreated');
    };
  }, [socket, isAuthenticated]);

  return (
    <GameNightContext.Provider
      value={{ gameNights, fetchGameNights, createGameNight, getGameNightById }}
    >
      {children}
    </GameNightContext.Provider>
  );
}
