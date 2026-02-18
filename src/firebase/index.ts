import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from '@/firebase/config';

export function initializeFirebase() {
  const apps = getApps();
  const firebaseApp = apps.length ? apps[0] : initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);

  return { firebaseApp, auth, firestore };
}

export * from '@/firebase/provider';
export * from '@/firebase/auth/use-user';
export * from '@/firebase/firestore/use-collection';
export * from '@/firebase/firestore/use-doc';
