import { PostArticle } from '../../modules/posts/components/post-article';
import { GetServerSideProps } from 'next';
import { getPost } from '../../services/firestore-posts.service';
import { getPostContent } from '../../services/storage-posts.service';
import { serialize } from 'next-mdx-remote/serialize';
import { IPost } from '../../shared/interfaces/posts.interface';
import { useRouter } from 'next/router';
import PostEdit from '../../modules/posts/components/post-edit';

type PostArticlePageProps = {
  post?: IPost;
};

export default function PostArticlePage({ post }: PostArticlePageProps) {
  const { query } = useRouter();

  return (
    <>
      {query.edit === 'true' ? (
        <PostEdit post={post} />
      ) : (
        <PostArticle post={post} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { query } = ctx;
  if (!query.authorId || !query.postId) {
    return { props: {} };
  }

  const post = await getPost(query.authorId as string, query.postId as string);
  const content = await getPostContent(post.storageUrl);
  const mdxContent = await serialize(content);

  const updatePost = { ...post, content, mdxContent };

  return { props: { post: updatePost } };
};
