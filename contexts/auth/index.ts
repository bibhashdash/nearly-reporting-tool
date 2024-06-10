import { Dispatch, SetStateAction } from 'react';
export { AuthContext, useAuthContext } from './context';
export { AuthContextProvider } from './Provider';
export interface AuthContextState {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  signIn: (email: string, password: string) => void,
  logout: () => void,
}