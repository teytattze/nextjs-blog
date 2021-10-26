import { Button, Box, FormControlLabel, Stack, Switch, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { ICreatePostData } from '../../../shared/interfaces/posts.interface';
import { useAuth } from '../../auth/auth.context';
import { createPostValidation, defaultCreatePostValue } from '../posts.lib';
import { submitPost } from '../posts.service';

export function PostCreateForm() {
	const { account } = useAuth();
	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ICreatePostData>();

	return (
		<LoadingWrapper loading={false}>
			<form
				onSubmit={handleSubmit(async (data) => {
					if (!account) {
						return;
					}
					await submitPost({ ...data, authorId: account.id });
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
	);
}
