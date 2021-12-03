import { GetStaticPaths, GetStaticProps } from 'next';
import { dehydrate, QueryClient } from 'react-query';
import { indexPosts } from '../../../../services/firestore-posts.service';
import { INDEX_POSTS_QUERY_KEY } from '../../../../shared/constants/posts.const';
import { IPostsFilters } from '../../../../shared/interfaces/posts.interface';
import { indexUsers } from '../../../../services/firestore-users.service';
import { PostsListing } from '../../../../modules/posts/components/posts-listing';
import { useIndexPost } from '../../../../modules/posts/posts.query';
import { useAuth } from '../../../../modules/auth/auth.context';

export default function PostsListingPage() {
  const { account } = useAuth();
  const { data, isLoading, isError } = useIndexPost({ authorId: account?.id });
  return <PostsListing posts={data} isLoading={isLoading} isError={isError} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await indexUsers();
  const params = users.map((user) => ({ params: { userId: user.id } }));
  return {
    paths: params,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filters: IPostsFilters = {
    authorId: ctx.params?.userId as string,
  };
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([INDEX_POSTS_QUERY_KEY, filters], () =>
    indexPosts(filters),
  );
  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
