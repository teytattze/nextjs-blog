import { GetStaticPaths, GetStaticProps } from 'next';
import { indexPosts } from '../../../services/firestore-posts.service';
import {
  IPost,
  IPostsFilters,
} from '../../../shared/interfaces/posts.interface';
import { indexUsers } from '../../../services/firestore-users.service';
import { PostsListing } from '../../../modules/posts/components/posts-listing';

type PostsListingPageProps = {
  posts: IPost[];
};

export default function PostsListingPage({ posts }: PostsListingPageProps) {
  return <PostsListing posts={posts} />;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await indexUsers();
  const params = users.map((user) => ({ params: { userId: user.id } }));
  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const filters: IPostsFilters = {
    authorId: ctx.params?.userId as string,
  };
  const posts = await indexPosts(filters);
  return {
    props: { posts },
    revalidate: 1,
  };
};
