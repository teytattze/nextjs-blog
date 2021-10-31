import * as React from 'react';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth } from '../../lib/firebase';
import { IAccount } from '../../shared/interfaces/auth.interface';
import { formatFirebaseUser } from './auth.helper';

type AuthContextValue = {
	account: IAccount | null;
};

const AuthContext = React.createContext<AuthContextValue>({
	account: null,
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

	const handleFirebaseUser = (firebaseUser: User | null) => {
		if (firebaseUser) {
			const formattedAccount = formatFirebaseUser(firebaseUser);
			setAccount(formattedAccount);
			return;
		}
		setAccount(null);
	};

	React.useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, handleFirebaseUser);
		return () => unsubscribe();
	}, []);

	return { account };
};

export const useAuth = () => {
	return React.useContext(AuthContext);
};
