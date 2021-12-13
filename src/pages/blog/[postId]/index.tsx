import * as React from 'react';
import { PostArticle } from '../../../modules/posts/components/post-article';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getPost, indexPosts } from '../../../services/firestore-posts.service';
import { getPostContent } from '../../../services/storage-posts.service';
import { serialize } from 'next-mdx-remote/serialize';
import { IPost } from '../../../shared/interfaces/posts.interface';
import { useRouter } from 'next/router';
import PostEdit from '../../../modules/posts/components/post-edit';
import { useAuth } from '../../../modules/auth/auth.context';

type PostArticlePageProps = {
  post?: IPost;
};

export default function PostArticlePage({ post }: PostArticlePageProps) {
  const { account } = useAuth();
  const { push, query } = useRouter();

  React.useEffect(() => {
    if (!query || query.edit === 'false') return;
    if (query.edit === 'true' && account?.id !== post?.authorId) {
      push(`/blog/${post?.id}`, undefined, { shallow: true });
    }
  }, [query, account, post]);

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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await indexPosts();
  const params = posts.map((post) => ({ params: { postId: post.id } }));
  return {
    paths: params,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { params } = ctx;
  const post = await getPost(params?.postId as string);
  const content = await getPostContent(post.storageUrl);
  const mdxContent = await serialize(content);
  const updatePost = { ...post, content, mdxContent };
  return {
    props: { post: updatePost },
    revalidate: 1,
  };
};
