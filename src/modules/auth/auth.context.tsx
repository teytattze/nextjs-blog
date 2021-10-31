import * as React from 'react';
import {
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	onAuthStateChanged,
	User,
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	sendEmailVerification,
} from '@firebase/auth';
import { auth } from '../../lib/firebase';
import { IAccount, ILoginData, IRegisterData } from '../../shared/interfaces/auth.interface';
import { createUser } from '../users/users.service';
import { formatFirebaseUser } from './auth.helper';
import { getCurrentTimestamp } from '../../lib/utils';
import { async } from '@firebase/util';

const googleProvider = new GoogleAuthProvider();

type AuthContextValue = {
	account: IAccount | null;
	loading: boolean;
	registerWithEmailAndPassword: (data: IRegisterData) => Promise<void>;
	loginWithEmailAndPassword: (data: ILoginData) => Promise<void>;
	registerOrLoginWithGoogle: () => Promise<void>;
	logout: () => Promise<void>;
	sendEmailVerificationLink: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue>({
	account: null,
	loading: false,
	registerWithEmailAndPassword: async () => undefined,
	loginWithEmailAndPassword: async () => undefined,
	registerOrLoginWithGoogle: async () => undefined,
	logout: async () => undefined,
	sendEmailVerificationLink: async () => undefined,
});

type AuthProviderProps = {
	children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const auth = useProvideAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useProvideAuth = () => {
	const [account, setAccount] = React.useState<IAccount | null>(null);
	const [loading, setLoading] = React.useState(false);

	const handleFirebaseUser = (firebaseUser: User | null) => {
		if (firebaseUser) {
			const formattedAccount = formatFirebaseUser(firebaseUser);
			setAccount(formattedAccount);
			setLoading(false);
			return;
		}
		setAccount(null);
		setLoading(false);
	};

	const registerWithEmailAndPassword = async (data: IRegisterData) => {
		try {
			setLoading(true);
			const { firstName, lastName, email, password } = data;
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			if (userCredentials?.user) {
				await updateProfile(userCredentials?.user, {
					displayName: `${firstName} ${lastName}`,
				});
				await createUser({
					id: userCredentials?.user.uid,
					firstName,
					lastName,
					email,
					emailVerified: userCredentials?.user.emailVerified,
					createdAt: getCurrentTimestamp(),
				});
			}
		} finally {
			setLoading(false);
		}
	};

	const loginWithEmailAndPassword = async (data: ILoginData) => {
		try {
			setLoading(true);
			const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
			handleFirebaseUser(user);
		} finally {
			setLoading(false);
		}
	};

	const registerOrLoginWithGoogle = async () => {
		try {
			const { user } = await signInWithPopup(auth, googleProvider);
			console.log(user.providerData);
		} catch (error) {
			console.log(error);
		}
	};

	const logout = async () => {
		await signOut(auth);
	};

	const sendEmailVerificationLink = async () => {
		if (auth.currentUser) {
			const result = await sendEmailVerification(auth.currentUser);
			console.log(result);
		}
	};

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleFirebaseUser);
		return () => unsubscribe();
	}, []);

	return {
		account,
		loading,
		registerWithEmailAndPassword,
		loginWithEmailAndPassword,
		registerOrLoginWithGoogle,
		logout,
		sendEmailVerificationLink,
	};
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
