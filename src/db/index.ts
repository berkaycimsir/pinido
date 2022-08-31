import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../constants/firebase';

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();
