import { GetStaticPaths, GetStaticProps } from 'next';
import { serialize } from 'next-mdx-remote/serialize';
import { getPost, getPostContent, indexPosts } from '../../services/firebase-posts.service';
import { getUser } from '../../services/firebase-users.service';

export { default } from '../../modules/posts/components/post-article';

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
