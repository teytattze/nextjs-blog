import * as React from 'react';
import {
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	createUserWithEmailAndPassword,
	updateProfile,
} from '@firebase/auth';
import { auth } from '../../lib/firebase';
import { IAccount, ILoginData, IRegisterData } from '../../shared/interfaces/auth.interface';
import { createUser } from '../../models/users.model';
import { formatFirebaseUser } from './auth.helper';

type AuthContextValue = {
	account: IAccount | null;
	loading: boolean;
	registerWithEmailAndPassword: (data: IRegisterData) => Promise<void>;
	loginWithEmailAndPassword: (data: ILoginData) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue>({
	account: null,
	loading: false,
	registerWithEmailAndPassword: async () => undefined,
	loginWithEmailAndPassword: async () => undefined,
	logout: async () => undefined,
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
		setLoading(true);
		const { firstName, lastName, email, password } = data;
		const { user } = await createUserWithEmailAndPassword(auth, email, password);

		if (user) {
			await updateProfile(user, {
				displayName: `${firstName} ${lastName}`,
			});
			await createUser({
				id: user.uid,
				firstName,
				lastName,
				email,
				emailVerified: user.emailVerified,
			});
		}
	};

	const loginWithEmailAndPassword = async (data: ILoginData) => {
		setLoading(true);
		const { user } = await signInWithEmailAndPassword(auth, data.email, data.password);
		handleFirebaseUser(user);
	};

	const logout = async () => {
		await signOut(auth);
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
		logout,
	};
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
