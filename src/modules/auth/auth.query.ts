import { updateProfile, UserCredential } from '@firebase/auth';
import { useMutation, UseMutationOptions } from 'react-query';
import { getCurrentTimestamp } from '../../lib/utils';
import {
	loginWithCredentials,
	loginWithGoogle,
	logout,
	registerWithCredentials,
	sendEmailVerificationLink,
} from '../../services/firebase-auth.service';
import { ILoginData, IRegisterData } from '../../shared/interfaces/auth.interface';
import { createUser } from '../../services/firebase-users.service';

export const useRegisterWithCredentials = (
	options?: UseMutationOptions<UserCredential, unknown, IRegisterData, unknown>,
) => {
	return useMutation(async (data: IRegisterData) => {
		const { firstName, lastName, email } = data;
		const userCredential = await registerWithCredentials(data);
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
	}, options);
};

export const useLoginWithCredentials = (
	options?: UseMutationOptions<UserCredential, unknown, ILoginData, unknown>,
) => {
	return useMutation((data: ILoginData) => {
		return loginWithCredentials(data);
	}, options);
};

export const useLoginWithGoogle = (
	options?: UseMutationOptions<UserCredential, unknown, void, unknown>,
) => {
	return useMutation(() => {
		return loginWithGoogle();
	}, options);
};

export const useLogout = (options?: UseMutationOptions) => {
	return useMutation(() => {
		return logout();
	}, options);
};
