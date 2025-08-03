import { ReactNode, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext';
import { io, Socket } from 'socket.io-client';
import apiInfo from '@/helpers/API/apiInfo';

interface Props {
  children: ReactNode;
}

export default function SocketContextProvider({ children }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(apiInfo.URL, {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
