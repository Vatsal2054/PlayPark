import { createContext } from 'react';
export const InvitationContext = createContext({
    invitations: [],
    fetchInvitations: () => { },
    respondToInvitation: () => { },
    sendInvitation: () => { },
    fetchInvitationsByGameNight: () => Promise.resolve([]),
    fetchJoinedGameNights: () => Promise.resolve([]),
    gameNightInvitations: {},
});
