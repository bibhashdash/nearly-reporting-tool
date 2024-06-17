import { createContext, useContext } from 'react';
import { AuthContextState } from './index';

export const AuthContext = createContext<AuthContextState>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  signIn: () => {},
  logout: () => {},
  fetchUserCustomDetails: () => {},
  user: null,
  nearlyUser: null,
})

export const useAuthContext = () => useContext(AuthContext)