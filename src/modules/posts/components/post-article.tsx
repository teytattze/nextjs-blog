import { MDXRemote } from 'next-mdx-remote';
import { BlogLayout } from '../../../layouts/blog-layout';
import { Alert } from '@mui/material';
import { IPost } from '../../../shared/interfaces/posts.interface';

type PostArticleProps = {
  post?: IPost;
};

export function PostArticle({ post }: PostArticleProps) {
  return (
    <>
      {post ? (
        <BlogLayout post={post}>
          <MDXRemote {...post.mdxContent!} />
        </BlogLayout>
      ) : (
        <Alert severity='warning'>Error...there is no available post!</Alert>
      )}
    </>
  );
}
