import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { indexPosts, getPost, getPostContent } from '../../modules/posts/posts.service';
import { IPost } from '../../shared/interfaces/posts.interface';

type BlogPageProps = {
	post: IPost;
	article: MDXRemoteSerializeResult<Record<string, unknown>>;
};

const BlogPage: NextPage<BlogPageProps> = ({ post, article }) => {
	const router = useRouter();
	return <div>{!router.isFallback && <MDXRemote {...article} />}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await indexPosts();
	const params = posts.map((post) => ({ params: { id: post.id } }));
	return {
		paths: params,
		fallback: true,
	};
};

export const getStaticProps: GetStaticProps = async (ctx) => {
	const { id } = ctx.params!;

	const post = await getPost(id as string);
	const content = await getPostContent(post.storageUrl);
	const article = await serialize(content);

	return { props: { post, article } };
};

export default BlogPage;
