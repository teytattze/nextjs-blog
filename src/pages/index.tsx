import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { indexPosts } from '../services/firestore-posts.service';
import { INDEX_POSTS_QUERY_KEY } from '../shared/constants/posts.const';
import { IPostsFilters } from '../shared/interfaces/posts.interface';
import { useIndexPost } from '../modules/posts/posts.query';
import { PostsListing } from '../modules/posts/components/posts-listing';

export default function PostsListingPage() {
  const { data, isLoading, isError } = useIndexPost({
    published: true,
  });
  return <PostsListing posts={data} isLoading={isLoading} isError={isError} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const filters: IPostsFilters = {
    published: true,
  };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([INDEX_POSTS_QUERY_KEY, filters], () =>
    indexPosts(filters),
  );

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
