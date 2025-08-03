import { useEffect, useState, ReactNode, useContext } from 'react';
import { InvitationContext } from './InvitationContext';
import type { Invitation } from '../types/Invitation';
import getApi from '../helpers/API/getApi';
import postApi from '../helpers/API/postApi';
import patchApi from '../helpers/API/patchApi';
import toast from 'react-hot-toast';
import { SocketContext } from './SocketContext';
import { AuthContext } from './AuthContext';

interface Props {
  children: ReactNode;
}

export default function InvitationContextProvider({ children }: Props) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [gameNightInvitations, setGameNightInvitations] = useState<
    Record<string, Invitation[]>
  >({});
  const { isAuthenticated } = useContext(AuthContext);

  const { socket } = useContext(SocketContext);

  async function fetchInvitations() {
    if (!isAuthenticated) return;
    const res = await getApi('/invitations');
    console.log('Fetched Invitations:', res.data);

    if (res.status === 200) {
      setInvitations(res.data as Invitation[]);
    }
  }

  async function sendInvitation(data: object) {
    if (!isAuthenticated) return;
    const res = await postApi('/invitations', data);
    if (res.status === 201) {
      toast.success('Invitation sent');
    }
  }

  async function respondToInvitation(id: string, status: string) {
    if (!isAuthenticated) return;
    const res = await patchApi(`/invitations/${id}`, { status });
    if (res.status === 200) {
      fetchInvitations();
      toast.success('Response recorded');
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchInvitations();

    if (!socket) return;

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

  async function fetchInvitationsByGameNight(gameNightId: string) {
    if (!isAuthenticated) return [];
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
    if (!isAuthenticated) return [];
    const res = await getApi('/invitations/joined');
    if (res.status === 200) {
      return res.data; // Array of GameNights
    }
    return [];
  }

  function updateInvitationInGameNight(invitation: Invitation) {
    if (!isAuthenticated) return;
    const gameNightId = invitation.gameNight;
    setGameNightInvitations((prev) => {
      const existing = prev[gameNightId] || [];
      const updated = existing.map((inv) =>
        inv._id === invitation._id ? invitation : inv
      );
      return { ...prev, [gameNightId]: updated };
    });
  }

  return (
    <InvitationContext.Provider
      value={{
        invitations,
        fetchInvitations,
        sendInvitation,
        respondToInvitation,
        fetchInvitationsByGameNight,
        fetchJoinedGameNights,
        gameNightInvitations,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}
