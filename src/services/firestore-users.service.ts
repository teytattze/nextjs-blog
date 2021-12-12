import { doc, getDoc, getDocs, setDoc, collection } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { IUser } from '../shared/interfaces/users.interface';
import { USERS_COLLECTION } from '../lib/firestore/users.query';

export const indexUsers = async (): Promise<IUser[]> => {
  const snapshots = await getDocs(collection(db, USERS_COLLECTION));
  return snapshots.docs.map((doc) => doc.data() as IUser);
};

export const getUser = async (id: string) => {
  const snapshot = await getDoc(doc(db, USERS_COLLECTION, id));
  return snapshot.data();
};

export const createUser = async (data: IUser) => {
  return await setDoc(doc(db, USERS_COLLECTION, data.id), { ...data });
};
