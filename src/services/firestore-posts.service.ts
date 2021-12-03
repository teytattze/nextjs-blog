import { doc, getDoc, getDocs, setDoc } from '@firebase/firestore';
import { db } from '../lib/firebase';
import { createId, getCurrentTimestamp } from '../lib/utils';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import {
  ICreatePostData,
  IPost,
  IPostsFilters,
} from '../shared/interfaces/posts.interface';
import {
  indexPostsQuery,
  POSTS_COLLECTION,
} from '../lib/firestore/posts.query';
import { createPostContent } from './storage-posts.service';

export const indexPosts = async (filters?: IPostsFilters): Promise<IPost[]> => {
  const snapshots = await getDocs(indexPostsQuery(filters));
  return snapshots.docs.map((doc) => doc.data() as IPost);
};

export const getPost = async (
  userId: string,
  postId: string,
): Promise<IPost> => {
  const snapshot = await getDoc(
    doc(db, USERS_COLLECTION, userId, POSTS_COLLECTION, postId),
  );
  return snapshot.data() as IPost;
};

export const createPost = async (data: ICreatePostData) => {
  const postId = createId();
  const { title, content, published, authorId, authorName } = data;
  const storageUrl = await createPostContent({
    id: postId,
    authorId,
    content,
  });

  const updatedData: IPost = {
    id: postId,
    title,
    content: null,
    storageUrl,
    published,
    authorId,
    authorName,
    createdAt: getCurrentTimestamp(),
  };

  await setDoc(
    doc(db, USERS_COLLECTION, authorId, POSTS_COLLECTION, postId),
    updatedData,
  );
};
