import { AuthErrorCodes, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../db';

export const handleSignUpError = (error: any): string => {
  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'Email is already exists.';
    default:
      return 'Something went wrong, please try again!';
  }
};

export const handleSignInError = (error: any): string => {
  switch (error.code) {
    case AuthErrorCodes.INVALID_EMAIL:
      return 'Email is invalid.';
    case AuthErrorCodes.USER_DELETED:
      return 'There is no account with that email.';
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Incorrect password.';
    default:
      return 'Something went wrong, please try again!';
  }
};

export const getCurrentUserFromServerSide = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};
