import { createContext } from 'react';

export interface GameNight {
    _id?: string;
    title: string;
    date: string;
    time: string;
    location: string;
    game: string; // game ID
    invitedPlayers?: string[]; // user IDs
    confirmedPlayers?: string[];
    maxPlayers?: number;
    host?: string;
}

export interface GameNightContextType {
    gameNights: GameNight[];
    fetchGameNights: () => void;
    createGameNight: (data: GameNight) => void;
}

export const GameNightContext = createContext<GameNightContextType>({
    gameNights: [],
    fetchGameNights: () => {},
    createGameNight: () => {},
    getGameNightById: () => Promise.resolve(null),
});
