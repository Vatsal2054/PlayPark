import { createContext } from 'react';
// Default values to avoid null checks
export const GameContext = createContext({
    games: [],
    fetchGames: () => { },
    addGame: () => { },
});
