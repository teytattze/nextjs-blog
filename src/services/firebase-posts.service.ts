import {
  collectionGroup,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from '@firebase/firestore';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { db, storage } from '../lib/firebase';
import { createId, getCurrentTimestamp } from '../lib/utils';
import { POSTS_COLLECTION } from '../shared/constants/posts.const';
import { USERS_COLLECTION } from '../shared/constants/users.const';
import {
  ICreatePostData,
  IPost,
  IPostsFilters,
} from '../shared/interfaces/posts.interface';

export const getIndexPostsQuery = (filters?: IPostsFilters) => {
  const collectionRef = collectionGroup(db, POSTS_COLLECTION);
  if (filters?.published === undefined) {
    return query(collectionRef);
  }
  return query(collectionRef, where('published', '==', filters?.published));
};

export const createPost = async (data: ICreatePostData) => {
  const postId = createId();
  const { title, content, published, authorId } = data;

  const postRef = ref(storage, `${authorId}/posts/${title}`);
  const snapshot = await uploadString(postRef, content);

  const updatedData: IPost = {
    id: postId,
    title,
    content: null,
    storageUrl: snapshot.ref.toString(),
    published,
    authorId,
    createdAt: getCurrentTimestamp(),
  };

  await setDoc(
    doc(db, USERS_COLLECTION, authorId, POSTS_COLLECTION, postId),
    updatedData,
  );
};

export const indexPosts = async (filters?: IPostsFilters): Promise<IPost[]> => {
  const snapshots = await getDocs(getIndexPostsQuery(filters));
  return snapshots.docs.map((doc) => doc.data() as IPost);
};

export const getPost = async (postId: string): Promise<IPost> => {
  const snapshots = await getDocs(collectionGroup(db, POSTS_COLLECTION));
  const filteredPost = snapshots.docs
    .filter((doc) => {
      const { id } = doc.data();
      return postId === id;
    })
    .map((doc) => doc.data());
  return filteredPost[0] as IPost;
};

export const getPostContent = async (storageUrl: string): Promise<string> => {
  const downloadUrl = await getDownloadURL(ref(storage, storageUrl));
  const result = await fetch(downloadUrl)
    .then((res) => res.blob())
    .then((res) => res.text());
  return result;
};
