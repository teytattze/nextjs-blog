import {
  Box,
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { PageLayout } from '../../../layouts/page-layout';
import { useAuth } from '../../../modules/auth/auth.context';
import { createPostValidation, defaultCreatePostValue } from '../posts.lib';
import { createPost } from '../../../services/firestore-posts.service';
import { ICreatePostData } from '../../../shared/interfaces/posts.interface';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

export function NewPost() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { account } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ICreatePostData>();

  const handleCreatePost = async (data: ICreatePostData) => {
    if (!account) return;
    setIsLoading(true);

    try {
      const id = await createPost({
        ...data,
        authorId: account.id,
        authorName: account.displayName,
      });
      await push(`/blog/${id}`);
      enqueueSnackbar('New post created successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Cannot create new post', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title='New Post'>
      <LoadingWrapper loading={isLoading}>
        <form onSubmit={handleSubmit(handleCreatePost)}>
          <Stack spacing={2.5} sx={{ mt: 6 }}>
            <Controller
              name='title'
              control={control}
              defaultValue={defaultCreatePostValue.title}
              rules={createPostValidation.title}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Title'
                  variant='outlined'
                  helperText={errors.title?.message}
                  error={Boolean(errors.title)}
                />
              )}
            />
            <Controller
              name='content'
              control={control}
              defaultValue={defaultCreatePostValue.content}
              rules={createPostValidation.content}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Content'
                  variant='outlined'
                  multiline
                  minRows={12}
                  helperText={errors.content?.message}
                  error={Boolean(errors.content)}
                />
              )}
            />
            <Controller
              name='published'
              control={control}
              defaultValue={defaultCreatePostValue.published}
              rules={createPostValidation.published}
              render={({ field }) => (
                <FormControlLabel
                  control={<Switch {...field} />}
                  label='Publish'
                />
              )}
            />
          </Stack>
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Button type='submit' variant='contained' disableElevation>
              Submit
            </Button>
          </Box>
        </form>
      </LoadingWrapper>
    </PageLayout>
  );
}
