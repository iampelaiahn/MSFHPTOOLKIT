'use client';
import { createContext, useContext } from 'react';

import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

export const FirebaseContext = createContext<{
  firebaseApp: FirebaseApp | null;
  auth: Auth | null;
  firestore: Firestore | null;
} | null>(null);

export const FirebaseProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: {
    firebaseApp: FirebaseApp;
    auth: Auth;
    firestore: Firestore;
  };
}) => {
  return (
    <FirebaseContext.Provider value={value}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export const useFirebaseApp = () => {
  return useFirebase()?.firebaseApp;
};

export const useAuth = () => {
  return useFirebase()?.auth;
};

export const useFirestore = () => {
  return useFirebase()?.firestore;
};
