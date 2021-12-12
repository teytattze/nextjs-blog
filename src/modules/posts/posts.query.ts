import { useQuery } from 'react-query';
import { getPost, indexPosts } from '../../services/firestore-posts.service';
import { IPost, IPostsFilters } from '../../shared/interfaces/posts.interface';
import {
  GET_POST_QUERY_KEY,
  INDEX_POSTS_QUERY_KEY,
} from '../../shared/constants/posts.const';

export const useIndexPost = (filters?: IPostsFilters) => {
  return useQuery<IPost[]>([INDEX_POSTS_QUERY_KEY, filters], () =>
    indexPosts(filters),
  );
};

export const usePost = (userId: string, postId: string) => {
  return useQuery<IPost>([GET_POST_QUERY_KEY, userId, postId], () =>
    getPost(userId, postId),
  );
};
