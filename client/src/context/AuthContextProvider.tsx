import { useState, useContext, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import type { LoginCredentials, SignUpCredentials } from './AuthContext';
import { UserContext } from './UserContext';
import postApi from '../helpers/API/postApi';
import getApi from '../helpers/API/getApi';
import toast from 'react-hot-toast';

interface Props {
  children: ReactNode;
}

export default function AuthContextProvider({ children }: Props) {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { setUserInfo } = useContext(UserContext);

  async function loginUser(): Promise<boolean> {
    const res = await postApi('/auth/login', credentials);
    if (res.status === 200) {
      toast.success('User Logged in Successfully');
			setIsAuthenticated(true);
      return true;
    }
    toast.error('Login failed');
    return false;
  }

  async function signUpUser(
    signUpCredentials: SignUpCredentials
  ): Promise<boolean> {
    const res = await postApi('/auth/register', signUpCredentials);
		console.log('Signed Up Response:', res.data);
		
    if (res.status === 200) {
      toast.success('User Signed Up Successfully');
      return true;
    }
    return false;
  }

  async function pingUser(): Promise<boolean> {
		if (!isAuthenticated) return false;
    const res = await getApi('/auth/');
    console.log('Ping User Response:', res.data);

    if (res.status === 200) {
      setUserInfo(res.data.user);
			setIsAuthenticated(true);
      return true;
    }
    return false;
  }

  const logout = async () => {
    const res = await postApi('/auth/logout');
    if (res.status === 200) {
      setUser(null);
			setIsAuthenticated(false);
      localStorage.removeItem('token'); // or any local storage state
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider
      value={{
				isAuthenticated,
        credentials,
        setCredentials,
        loginUser,
        signUpUser,
        pingUser,
				logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
