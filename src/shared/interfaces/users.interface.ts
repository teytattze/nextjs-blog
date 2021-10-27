import { FieldValue } from '@firebase/firestore';

export interface IUser {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	emailVerified: boolean;
	createdAt: string;
}
