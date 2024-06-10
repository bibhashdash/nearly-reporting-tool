import { AuthContextState } from './index';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, User } from '@firebase/auth';
import { auth } from '../../utilities/firebase';
import { router, useSegments } from 'expo-router';

export function useAuthContextState(): AuthContextState {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  function useProtectedRoute(user: User | null) {
    const segments = useSegments();

    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';

      console.log(inAuthGroup);

      if (!user && inAuthGroup) {
        router.replace('/');
      } else if (user && !inAuthGroup) {
        router.replace('/(auth)/(tabs)/');
      }
    }, [user, segments]);
  }
  const signIn = (email: string, password: string) => {
    console.log('about to sign in')
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential.user.email);
        setIsLoggedIn(true);
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null)
    });
  }

  useProtectedRoute(user);

  return {
    isLoggedIn,
    setIsLoggedIn,
    logout,
    signIn,
    user,
  }
}