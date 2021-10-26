import { User } from '@firebase/auth';
import { IAccount } from '../../shared/interfaces/auth.interface';

export const formatFirebaseUser = (user: User): IAccount => {
	return {
		id: user.uid,
		displayName: user.displayName!,
		email: user.email!,
		emailVerified: user.emailVerified,
		providerId: user.providerData[0].providerId,
		photoUrl: user.photoURL,
	};
};
