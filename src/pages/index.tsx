import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { indexPosts } from '../services/firebase-posts.service';

export { default } from '../modules/posts/components/posts-listing';

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery(['posts'], () => indexPosts());

	return {
		props: { dehydratedState: dehydrate(queryClient) },
	};
};
