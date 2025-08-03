import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import AuthContextProvider from './context/AuthContextProvider';
import GameContextProvider from './context/GameContextProvider';
import GameNightContextProvider from './context/GameNightContextProvider';
import InvitationContextProvider from './context/InvitationContextProvider';
import UserContextProvider from './context/UserContextProvider.tsx';
import SocketContextProvider from './context/SocketContextProvider.tsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      containerStyle={{}}
      containerClassName=""
      toastOptions={{
        duration: 5000,
        style: {
          background: '#363636',
          color: '#fff',
          padding: '16px',
          borderRadius: '8px',
        },
      }}
    />
    <SocketContextProvider>
      <UserContextProvider>
        <AuthContextProvider>
          <GameContextProvider>
            <GameNightContextProvider>
              <InvitationContextProvider>
                <App />
              </InvitationContextProvider>
            </GameNightContextProvider>
          </GameContextProvider>
        </AuthContextProvider>
      </UserContextProvider>
    </SocketContextProvider>
  </StrictMode>
);
