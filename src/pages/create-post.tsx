import { Button, Box, FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import { NextPage } from 'next';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper } from '../components/loading-wrapper';
import { PageLayout } from '../layouts/page-layout';
import { useAuth } from '../modules/auth/auth.context';
import { createPostValidation, defaultCreatePostValue } from '../modules/posts/posts.lib';
import { createPost } from '../modules/posts/posts.service';
import { ICreatePostData } from '../shared/interfaces/posts.interface';

const CreatePostPage: NextPage = () => {
	const { account } = useAuth();
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ICreatePostData>();

	return (
		<PageLayout title="New Post">
			<LoadingWrapper loading={false}>
				<form
					onSubmit={handleSubmit(async (data) => {
						if (!account) {
							return;
						}
						await createPost({ ...data, authorId: account.id });
						reset(defaultCreatePostValue);
					})}
				>
					<Stack spacing={2.5} sx={{ mt: 6 }}>
						<Controller
							name="title"
							control={control}
							defaultValue={defaultCreatePostValue.title}
							rules={createPostValidation.title}
							render={({ field }) => (
								<TextField
									{...field}
									label="Title"
									variant="outlined"
									helperText={errors.title?.message}
									error={Boolean(errors.title)}
								/>
							)}
						/>
						<Controller
							name="content"
							control={control}
							defaultValue={defaultCreatePostValue.content}
							rules={createPostValidation.content}
							render={({ field }) => (
								<TextField
									{...field}
									label="Content"
									variant="outlined"
									multiline
									minRows={12}
									helperText={errors.content?.message}
									error={Boolean(errors.content)}
								/>
							)}
						/>
						<Controller
							name="published"
							control={control}
							defaultValue={defaultCreatePostValue.published}
							rules={createPostValidation.published}
							render={({ field }) => (
								<FormControlLabel control={<Switch {...field} />} label="Publish" />
							)}
						/>
					</Stack>
					<Box sx={{ mt: 6, textAlign: 'center' }}>
						<Button type="submit" variant="contained" disableElevation>
							Submit
						</Button>
					</Box>
				</form>
			</LoadingWrapper>
		</PageLayout>
	);
};

export default CreatePostPage;
