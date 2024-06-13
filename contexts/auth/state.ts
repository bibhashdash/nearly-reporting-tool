import { AuthContextState } from './index';
import { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, User } from '@firebase/auth';
import { auth, database } from '../../utilities/firebase';
import { router, useSegments } from 'expo-router';
import { doc, getDoc } from '@firebase/firestore';
export interface NearlyUser {
  displayName: string,
  email: string,
  role: string,
  uid: string,
}
export function useAuthContextState(): AuthContextState {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [nearlyUser, setNearlyUser] = useState<NearlyUser | null>(null)
  function useProtectedRoute(user: User | null) {
    const segments = useSegments();

    useEffect(() => {
      const inAuthGroup = segments[0] === '(auth)';
      if (!user && inAuthGroup) {
        router.replace('/');
      } else if (user && !inAuthGroup) {
        router.replace('/(auth)/(tabs)/');
      }
    }, [user, segments]);
  }
  const signIn = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        setIsLoggedIn(true);
        setUser(userCredential.user);
        const docRef = doc(database, 'users', userCredential.user.uid);
        getDoc(docRef).then(result => setNearlyUser(result.data() as NearlyUser));
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
    nearlyUser,
  }
}