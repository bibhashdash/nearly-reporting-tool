import { ReactNode } from 'react';
import { useAuthContextState } from './state';
import { AuthContext } from './context';

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const AuthState = useAuthContextState();

  return (
    <AuthContext.Provider value={ AuthState }>
      { children }
    </AuthContext.Provider>
  )
}