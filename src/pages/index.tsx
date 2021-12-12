import { GetStaticProps } from 'next';
import { indexPosts } from '../services/firestore-posts.service';
import { IPost, IPostsFilters } from '../shared/interfaces/posts.interface';
import { PostsListing } from '../modules/posts/components/posts-listing';

type PostsListingPageProps = {
  posts: IPost[];
};

export default function PostsListingPage({ posts }: PostsListingPageProps) {
  return <PostsListing posts={posts} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const filters: IPostsFilters = {
    published: true,
  };
  const posts = await indexPosts(filters);
  return {
    props: { posts },
    revalidate: 1,
  };
};
