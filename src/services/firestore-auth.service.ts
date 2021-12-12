import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
  User,
  UserCredential,
} from '@firebase/auth';
import { ILoginData, IRegisterData } from '../shared/interfaces/auth.interface';
import { auth } from '../lib/firebase';
import { createUser } from './firestore-users.service';
import { getCurrentTimestamp } from '../lib/utils';

const googleProvider = new GoogleAuthProvider();

export const registerWithCredentials = async (
  data: IRegisterData,
): Promise<UserCredential> => {
  const { firstName, lastName, email, password } = data;
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  await updateProfile(userCredential.user, {
    displayName: `${data.firstName} ${data.lastName}`,
  });
  await createUser({
    id: userCredential.user.uid,
    firstName,
    lastName,
    email,
    emailVerified: userCredential.user.emailVerified,
    createdAt: getCurrentTimestamp(),
  });
  await sendEmailVerificationLink(userCredential.user);
  return userCredential;
};

export const loginWithCredentials = async (
  data: ILoginData,
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
  return await signInWithRedirect(auth, googleProvider);
};

export const logout = async () => {
  await signOut(auth);
};

export const sendEmailVerificationLink = async (user: User) => {
  await sendEmailVerification(user);
};
