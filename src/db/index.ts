import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage, ref } from 'firebase/storage';
import { collection, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../constants/firebase';

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();
export const profilePicturesRef = ref(storage, 'profile-pictures');

export const firestore = getFirestore(firebase);
export const todosRef = collection(firestore, 'todos');
