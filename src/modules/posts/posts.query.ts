import { useQuery } from 'react-query';
import { indexPosts } from '../../services/firebase-posts.service';
import { IPostsFilters } from '../../shared/interfaces/posts.interface';

export const useIndexPost = (filters?: IPostsFilters) => {
  return useQuery(['posts'], () => indexPosts(filters));
};
