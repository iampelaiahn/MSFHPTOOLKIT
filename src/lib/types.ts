import { Timestamp } from 'firebase/firestore';

export type Referral = {
  id: string; // Firestore document ID
  peerName: string;
  referralId: string;
  referralDate: Timestamp;
  month: string;
  linked: boolean;
  linkageDate: Timestamp | null;
};
