import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { indexPosts, getPost, getPostContent } from '../../services/firebase-posts.service';
import { IPost } from '../../shared/interfaces/posts.interface';
import { BlogLayout } from '../../layouts/blog-layout';
import { getUser } from '../../services/firebase-users.service';
import { IUser } from '../../shared/interfaces/users.interface';

type BlogPageProps = {
	post: IPost;
	author: IUser;
};

const BlogPage: NextPage<BlogPageProps> = ({ post, author }) => {
	const router = useRouter();

	return (
		<>
			{!router.isFallback && (
				<BlogLayout post={post} author={author}>
					<MDXRemote {...post.content!} />
				</BlogLayout>
			)}
		</>
	);
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
	const author = await getUser(post.authorId);
	const content = await getPostContent(post.storageUrl);
	const article = await serialize(content);

	const updatePost = { ...post, content: article, rawContent: content };

	return { props: { post: updatePost, author } };
};

export default BlogPage;
