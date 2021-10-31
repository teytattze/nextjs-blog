import { Box, Typography } from '@mui/material';
import { NextComponentType } from 'next';
import { IPost } from '../shared/interfaces/posts.interface';
import { IUser } from '../shared/interfaces/users.interface';

type BlogLayoutProps = {
	post: IPost;
	author: IUser;
};

export const BlogLayout: NextComponentType<{}, {}, BlogLayoutProps> = ({
	children,
	post,
	author,
}) => {
	console.log(author);
	return (
		<>
			<Typography
				variant="h3"
				sx={{
					fontWeight: 600,
				}}
			>
				{post.title}
			</Typography>
			<Box sx={{ mt: 4 }}>{children}</Box>
		</>
	);
};
