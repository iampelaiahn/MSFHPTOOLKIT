'use client';

import { useEffect, useState, useRef } from 'react';
import {
  onSnapshot,
  collection,
  query,
  where,
  getDocs,
  type DocumentData,
  type Query,
} from 'firebase/firestore';

import { useFirestore } from '@/firebase/provider';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useCollection<T = DocumentData>(
  q: Query<DocumentData> | null
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setLoading(false);
      setData(null);
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: T[] = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as T)
        );
        setData(data);
        setLoading(false);
      },
      async (err) => {
        const permissionError = new FirestorePermissionError({
          path: (q as any)._path?.segments.join('/'),
          operation: 'list',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
}
