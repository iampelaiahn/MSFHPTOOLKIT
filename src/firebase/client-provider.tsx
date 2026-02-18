'use client';
import { useMemo } from 'react';

import { FirebaseProvider } from '@/firebase/provider';
import { initializeFirebase } from '@/firebase';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { firebaseApp, auth, firestore } = useMemo(
    () => initializeFirebase(),
    []
  );

  return (
    <FirebaseProvider value={{ firebaseApp, auth, firestore }}>
      {children}
    </FirebaseProvider>
  );
}
