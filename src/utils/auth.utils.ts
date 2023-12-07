import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { auth, firestore } from './firebase.utils';

export type UserType = {
  name: string;
  lastname: string;
  email: string | null;
  phoneNumber?: string;
};

const signInWithGoogle = async (): Promise<UserType | null> => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    const user = result.user;

    if (!user) {
      return null;
    }

    const { displayName, email, phoneNumber, uid } = user;

    // Ensure that name and lastname are always strings
    const [name, lastname] = displayName ? displayName.split(' ') : ['', ''];

    const userData: UserType = {
      name: name || '', // If name is null or undefined, set it to an empty string
      lastname: lastname || '', // If lastname is null or undefined, set it to an empty string
      email,
      phoneNumber: phoneNumber || '',
    };

    await firestore.collection('users').doc(uid).set(userData);

    return userData;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export { signInWithGoogle };
