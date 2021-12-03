import { collectionGroup, query, where } from '@firebase/firestore';
import { IPostsFilters } from '../../shared/interfaces/posts.interface';
import { db } from '../firebase';

export const POSTS_COLLECTION = 'posts';

export const indexPostsQuery = (filters?: IPostsFilters) => {
  const collectionRef = collectionGroup(db, POSTS_COLLECTION);
  if (!filters) {
    return query(collectionRef);
  }

  const cons = [];
  if (filters?.published !== undefined) {
    cons.push(where('published', '==', filters?.published));
  }
  if (filters?.authorId !== undefined) {
    cons.push(where('authorId', '==', filters?.authorId));
  }
  return query(collectionRef, ...cons);
};
