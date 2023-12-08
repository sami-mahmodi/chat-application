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
    const [name, lastname] = displayName ? displayName.split(' ') : ['', ''];

    const userData: UserType = {
      name: name || '', 
      lastname: lastname || '', 
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
