import { createContext } from 'react';
export const GameNightContext = createContext({
    gameNights: [],
    fetchGameNights: () => { },
    createGameNight: () => { },
    getGameNightById: () => Promise.resolve(null),
});
