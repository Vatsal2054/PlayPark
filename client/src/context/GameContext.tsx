import { createContext } from 'react';

// Define game type
export interface Game {
    _id?: string;
    title: string;
    type: 'board' | 'video' | 'rpg';
    minPlayers?: number;
    maxPlayers?: number;
    duration?: string;
    complexity?: 'easy' | 'medium' | 'hard';
}

// Define context shape
export interface GameContextType {
    games: Game[];
    fetchGames: () => void;
    addGame: (game: Game) => void;
}

// Default values to avoid null checks
export const GameContext = createContext<GameContextType>({
    games: [],
    fetchGames: () => {},
    addGame: () => {},
});
