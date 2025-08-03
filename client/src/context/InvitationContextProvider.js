import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState, ReactNode, useContext } from 'react';
import { InvitationContext } from './InvitationContext';
import getApi from '../helpers/API/getApi';
import postApi from '../helpers/API/postApi';
import patchApi from '../helpers/API/patchApi';
import toast from 'react-hot-toast';
import { SocketContext } from './SocketContext';
import { AuthContext } from './AuthContext';
export default function InvitationContextProvider({ children }) {
    const [invitations, setInvitations] = useState([]);
    const [gameNightInvitations, setGameNightInvitations] = useState({});
    const { isAuthenticated } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    async function fetchInvitations() {
        if (!isAuthenticated)
            return;
        const res = await getApi('/invitations');
        console.log('Fetched Invitations:', res.data);
        if (res.status === 200) {
            setInvitations(res.data);
        }
    }
    async function sendInvitation(data) {
        if (!isAuthenticated)
            return;
        const res = await postApi('/invitations', data);
        if (res.status === 201) {
            toast.success('Invitation sent');
        }
    }
    async function respondToInvitation(id, status) {
        if (!isAuthenticated)
            return;
        const res = await patchApi(`/invitations/${id}`, { status });
        if (res.status === 200) {
            fetchInvitations();
            toast.success('Response recorded');
        }
    }
    useEffect(() => {
        if (!isAuthenticated)
            return;
        fetchInvitations();
        if (!socket)
            return;
        socket.on('registrationUpdate', ({ gameNightId, userId }) => {
            toast.success(`A player joined a game night`);
            fetchInvitations();
            fetchInvitationsByGameNight(gameNightId);
        });
        socket.on('invitationUpdated', ({ gameNightId, invitation }) => {
            // toast.success(`Invitation updated`);
            updateInvitationInGameNight(invitation);
        });
        socket.on('newInvitation', ({ invitation }) => {
            toast.success('You received a new invitation!');
            fetchInvitations(); // Refresh receiver’s pending list
        });
        return () => {
            socket.off('registrationUpdate');
            socket.off('invitationStatusUpdated');
        };
    }, [socket, isAuthenticated]);
    async function fetchInvitationsByGameNight(gameNightId) {
        if (!isAuthenticated)
            return [];
        const res = await getApi(`/invitations/game-night/${gameNightId}`);
        if (res.status === 200) {
            setGameNightInvitations((prev) => ({
                ...prev,
                [gameNightId]: res.data,
            }));
            return res.data;
        }
        return [];
    }
    async function fetchJoinedGameNights() {
        if (!isAuthenticated)
            return [];
        const res = await getApi('/invitations/joined');
        if (res.status === 200) {
            return res.data; // Array of GameNights
        }
        return [];
    }
    function updateInvitationInGameNight(invitation) {
        if (!isAuthenticated)
            return;
        const gameNightId = invitation.gameNight;
        setGameNightInvitations((prev) => {
            const existing = prev[gameNightId] || [];
            const updated = existing.map((inv) => inv._id === invitation._id ? invitation : inv);
            return { ...prev, [gameNightId]: updated };
        });
    }
    return (_jsx(InvitationContext.Provider, { value: {
            invitations,
            fetchInvitations,
            sendInvitation,
            respondToInvitation,
            fetchInvitationsByGameNight,
            fetchJoinedGameNights,
            gameNightInvitations,
        }, children: children }));
}
