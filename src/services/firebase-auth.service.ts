import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
	GoogleAuthProvider,
	signOut,
	sendEmailVerification,
	User,
	UserCredential,
} from '@firebase/auth';
import { ILoginData, IRegisterData } from '../shared/interfaces/auth.interface';
import { auth } from '../lib/firebase';

const googleProvider = new GoogleAuthProvider();

export const registerWithCredentials = async (data: IRegisterData): Promise<UserCredential> => {
	const { email, password } = data;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithCredentials = async (data: ILoginData): Promise<UserCredential> => {
	return await signInWithEmailAndPassword(auth, data.email, data.password);
};

export const loginWithGoogle = async (): Promise<UserCredential> => {
	return await signInWithPopup(auth, googleProvider);
};

export const logout = async () => {
	await signOut(auth);
};

export const sendEmailVerificationLink = async (user: User) => {
	await sendEmailVerification(user);
};
