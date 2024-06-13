import { Dispatch, SetStateAction } from 'react';
import { User } from '@firebase/auth';
import {NearlyUser} from "./state";
export { AuthContext, useAuthContext } from './context';
export { AuthContextProvider } from './Provider';
export interface AuthContextState {
  isLoggedIn: boolean,
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>,
  signIn: (email: string, password: string) => void,
  logout: () => void,
  user: User | null,
  nearlyUser: NearlyUser | null,
}