import { addDoc, collection } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { POSTS_COLLECTION } from '../shared/constants/posts.const';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import { ICreatePostData } from '../shared/interfaces/posts.interface';

export const createPost = async (data: ICreatePostData) => {
	const id = data.authorId;
	return await addDoc(collection(db, USERS_COLLECTION, id, POSTS_COLLECTION), { ...data });
};
