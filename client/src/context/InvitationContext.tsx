import { createContext } from 'react';

export interface Invitation {
    _id: string;
    gameNightId: string;
    senderId: string;
    receiverId: string;
    status: 'pending' | 'accepted' | 'declined';
    createdAt: Date;
}
export interface InvitationContextType {
    invitations: Invitation[];
    fetchInvitations: () => void;
    respondToInvitation: (id: string, status: string) => void;
    sendInvitation: (data: object) => void;
}

export const InvitationContext = createContext<InvitationContextType>({
    invitations: [],
    fetchInvitations: () => {},
    respondToInvitation: () => {},
    sendInvitation: () => {},
    fetchInvitationsByGameNight: () => Promise.resolve([]),
    fetchJoinedGameNights: () => Promise.resolve([]),
    gameNightInvitations: {},
});
