import { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';
import type { User } from './UserContext';
import getApi from '../helpers/API/getApi';

interface Props {
  children: ReactNode;
}

export default function UserContextProvider({ children }: Props) {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const searchUsers = async (query: string) => {
    return await getApi(`/users/search?query=${query}`);
  };

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, searchUsers }}>
      {children}
    </UserContext.Provider>
  );
}
