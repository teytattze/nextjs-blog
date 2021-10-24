import { collection, addDoc, doc, updateDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import { IUser } from '../shared/interfaces/users.interface';

export const createUser = async (data: IUser & { profile: IProfile }) => {
	return await addDoc(collection(db, USERS_COLLECTION), data);
};

export const updateUser = async (userId: string, data: Partial<IUser>) => {
	return await updateDoc(doc(db, USERS_COLLECTION, userId), data);
};
