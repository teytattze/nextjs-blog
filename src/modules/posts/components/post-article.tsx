import { MDXRemote } from 'next-mdx-remote';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { IPost } from '../../../shared/interfaces/posts.interface';
import { BlogLayout } from '../../../layouts/blog-layout';
import { IUser } from '../../../shared/interfaces/users.interface';

type PostArticleProps = {
	post: IPost;
	author: IUser;
};

const PostArticle: NextPage<PostArticleProps> = ({ post, author }) => {
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

export default PostArticle;
