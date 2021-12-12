import {
  doc,
  deleteDoc,
  getDoc,
  getDocs,
  updateDoc,
  setDoc,
} from '@firebase/firestore';
import { db } from '../lib/firebase';
import { createId, getCurrentTimestamp } from '../lib/utils';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import {
  ICreatePostData,
  IDeletePostData,
  IPost,
  IPostsFilters,
  IUpdatePostData,
} from '../shared/interfaces/posts.interface';
import {
  indexPostsQuery,
  POSTS_COLLECTION,
} from '../lib/firestore/posts.query';
import { createPostContent, deletePostContent } from './storage-posts.service';

export const indexPosts = async (filters?: IPostsFilters): Promise<IPost[]> => {
  try {
    const snapshots = await getDocs(indexPostsQuery(filters));
    console.log(snapshots);
    return snapshots.docs.map((doc) => doc.data() as IPost);
  } catch (error) {
    console.log(error);
    return [];
  }
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

export const updatePost = async (data: IUpdatePostData) => {
  const { id, title, content, published, authorId } = data;
  await deletePostContent(id, authorId);
  const newStorageUrl = await createPostContent({ id, authorId, content });
  await updateDoc(doc(db, USERS_COLLECTION, authorId, POSTS_COLLECTION, id), {
    title,
    content,
    published,
    storageUrl: newStorageUrl,
  });
};

export const deletePost = async (data: IDeletePostData) => {
  const { id, authorId } = data;
  await deletePostContent(id, authorId);
  await deleteDoc(doc(db, USERS_COLLECTION, authorId, POSTS_COLLECTION, id));
};
