import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { firebaseConfig } from '../constants/firebase';

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();
export const profilePicturesRef = ref(storage, 'profile-pictures/');
