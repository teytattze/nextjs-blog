import { useQuery } from 'react-query';
import { indexPosts } from '../../services/firebase-posts.service';

export const useIndexPost = () => {
	return useQuery(['posts'], () => indexPosts());
};
