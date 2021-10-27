import { Skeleton, Stack, Typography } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LoadingWrapper } from '../components/loading-wrapper';
import { indexPosts } from '../modules/posts/posts.service';
import { IPost } from '../shared/interfaces/posts.interface';

type HomePageProps = {
	posts: IPost[];
};

const HomePage: NextPage<HomePageProps> = ({ posts }) => {
	const { isFallback } = useRouter();
	return (
		<LoadingWrapper
			loading={isFallback}
			type="skeleton"
			renderSkeleton={() => (
				<Stack direction="column" spacing={2}>
					<Skeleton variant="rectangular" height={24} />
					<Skeleton variant="rectangular" height={24} />
					<Skeleton variant="rectangular" height={188} />
				</Stack>
			)}
		>
			{posts?.length ? (
				<Stack direction="column" spacing={4}>
					{posts.map((post) => (
						<PostItem key={post.id} postId={post.id} username={post.authorId} title={post.title} />
					))}
				</Stack>
			) : (
				<Typography variant="h6" color="textSecondary">
					Sorry...published post is not available yet!
				</Typography>
			)}
		</LoadingWrapper>
	);
};

type PostItemProps = {
	postId: string;
	username: string;
	title: string;
};

function PostItem({ postId, username, title }: PostItemProps) {
	return (
		<NextLink href={`blog/${postId}`}>
			<Stack
				direction="column"
				spacing={2}
				sx={{
					p: { xs: 3, md: 5 },
					border: '1px solid',
					borderColor: 'grey.300',
					borderRadius: 4,
					cursor: 'pointer',
					transition: 'all 0.4s ease-in-out',
					':hover': {
						backgroundColor: 'background.paper',
						boxShadow: 5,
					},
				}}
			>
				<Typography variant="h6">{title}</Typography>
				<Typography
					variant="caption"
					sx={{
						color: 'text.secondary',
						fontWeight: 600,
						textTransform: 'uppercase',
					}}
				>
					By: {username}
				</Typography>
			</Stack>
		</NextLink>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = await indexPosts();

	return {
		props: { posts },
		revalidate: 1,
	};
};

export default HomePage;
