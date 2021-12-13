import {
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  setDoc,
} from '@firebase/firestore';
import { db } from '../lib/firebase';
import { createId, getCurrentTimestamp } from '../lib/utils';
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
import { USERS_COLLECTION } from '../lib/firestore/users.query';

export const indexPosts = async (filters?: IPostsFilters): Promise<IPost[]> => {
  const snapshots = await getDocs(indexPostsQuery(filters));
  return snapshots.docs.map((doc) => doc.data() as IPost);
};

export const getPost = async (id: string): Promise<IPost> => {
  const snapshots = await getDocs(indexPostsQuery({ id }));
  return snapshots.docs.map((doc) => doc.data() as IPost)[0];
};

export const createPost = async (data: ICreatePostData): Promise<string> => {
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

  return postId;
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
