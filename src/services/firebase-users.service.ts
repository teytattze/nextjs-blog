import { doc, getDoc, setDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import { IUser } from '../shared/interfaces/users.interface';

export const createUser = async (data: IUser) => {
	return await setDoc(doc(db, USERS_COLLECTION, data.id), { ...data });
};

export const getUser = async (id: string) => {
	const snapshot = await getDoc(doc(db, USERS_COLLECTION, id));
	return snapshot.data();
};
