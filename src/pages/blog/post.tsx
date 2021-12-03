import { PostArticle } from '../../modules/posts/components/post-article';
import { GetServerSideProps } from 'next';
import { getPost } from '../../services/firestore-posts.service';
import { getPostContent } from '../../services/storage-posts.service';
import { serialize } from 'next-mdx-remote/serialize';
import { IPost } from '../../shared/interfaces/posts.interface';

type PostArticlePageProps = {
  post?: IPost;
};

export default function PostArticlePage({ post }: PostArticlePageProps) {
  return <PostArticle post={post} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  if (!query.authorId || !query.postId) {
    return { props: {} };
  }

  const post = await getPost(query.authorId as string, query.postId as string);
  const content = await getPostContent(post.storageUrl);
  const article = await serialize(content);

  const updatePost = { ...post, content: article, rawContent: content };

  return { props: { post: updatePost } };
};
