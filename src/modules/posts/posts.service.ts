import { ref, uploadString } from '@firebase/storage';
import { auth, db, storage } from '../../lib/firebase';
import { createPost } from '../../models/posts.model';
import { ICreatePostData } from '../../shared/interfaces/posts.interface';

export const submitPost = async (data: ICreatePostData) => {
	const { title, content, published, authorId } = data;

	const postRef = ref(storage, `posts/${authorId}/${authorId}-${title}`);
	const snapshot = await uploadString(postRef, content);

	await createPost({ ...data, content: snapshot.ref.toString() });
};
