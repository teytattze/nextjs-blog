import { storage } from '../lib/firebase';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';
import { ICreatePostData } from '../shared/interfaces/posts.interface';

export const createPostContent = async ({
  id,
  authorId,
  content,
}: Omit<ICreatePostData, 'published' | 'title' | 'authorName'> & {
  id: string;
}): Promise<string> => {
  const postRef = ref(storage, `${authorId}/posts/${id}`);
  const snapshot = await uploadString(postRef, content);
  return snapshot.ref.toString();
};

export const getPostContent = async (storageUrl: string): Promise<string> => {
  const downloadUrl = await getDownloadURL(ref(storage, storageUrl));
  return await fetch(downloadUrl)
    .then((res) => res.blob())
    .then((res) => res.text());
};
