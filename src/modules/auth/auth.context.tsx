import * as React from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	User,
	updateProfile,
} from '@firebase/auth';
import { auth } from '../../lib/firebase';
import { ILoginData, IRegisterData } from '../../shared/interfaces/auth.interface';
import { IUser } from '../../shared/interfaces/users.interface';
import { createUser } from '../../models/users.model';

type AuthContextValue = {
	user?: IUser;
	loading: boolean;
	registerWithEmailAndPassword: (data: IRegisterData) => Promise<void>;
	loginWithEmailAndPassword: (data: ILoginData) => Promise<void>;
	logout: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue>({
	user: undefined,
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
	const [user, setUser] = React.useState<IUser | undefined>(undefined);
	const [loading, setLoading] = React.useState(false);

	const handleUser = (rawUser: User | null): IUser | null => {
		if (rawUser) {
			const formattedUser = formatUser(rawUser);
			setUser(formattedUser);
			setLoading(false);
			return formattedUser;
		}
		setUser(undefined);
		setLoading(false);
		return null;
	};

	const registerWithEmailAndPassword = async (data: IRegisterData) => {
		await createUserWithEmailAndPassword(auth, data.email, data.password);

		if (auth.currentUser) {
			await updateProfile(auth.currentUser, {
				displayName: `${data.firstName} ${data.lastName}`,
			});
			const newUser = handleUser(auth.currentUser);
			await createUser({
				...newUser!,
				profile: {
					firstName: data.firstName,
					lastName: data.lastName,
				},
			});
		}
	};

	const loginWithEmailAndPassword = async (data: ILoginData) => {
		await signInWithEmailAndPassword(auth, data.email, data.password).then((res) =>
			handleUser(res.user),
		);
	};

	const logout = async () => {
		await signOut(auth);
	};

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleUser);
		return () => unsubscribe();
	}, []);

	return {
		user,
		loading,
		registerWithEmailAndPassword,
		loginWithEmailAndPassword,
		logout,
	};
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};

const formatUser = (user: User): Omit<IUser, 'firstName' | 'lastName'> => {
	return {
		id: user.uid,
		displayName: user.displayName,
		email: user.email!,
		emailVerified: user.emailVerified,
		provider: user.providerData[0]?.providerId,
		photoUrl: user.photoURL,
	};
};
