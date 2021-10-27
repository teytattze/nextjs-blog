import { doc, setDoc } from '@firebase/firestore';
import { db } from '../../lib/firebase';
import { USERS_COLLECTION } from '../../shared/constants/users.const';
import { IUser } from '../../shared/interfaces/users.interface';

export const createUser = async (data: IUser) => {
	return await setDoc(doc(db, USERS_COLLECTION, data.id), { ...data });
};
