import {
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import * as React from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import {
  IPost,
  IUpdatePostData,
} from '../../../shared/interfaces/posts.interface';
import { useAuth } from '../../auth/auth.context';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import {
  deletePost,
  updatePost,
} from '../../../services/firestore-posts.service';
import { createPostValidation } from '../posts.lib';
import { PageLayout } from '../../../layouts/page-layout';

type PostEditProps = { post?: IPost };

export default function PostEdit({ post }: PostEditProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { account } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdatePostData>();

  const handleUpdatePost = async (data: IUpdatePostData) => {
    if (!post) return;
    if (account && account.id !== post.authorId) return;
    setIsLoading(true);

    try {
      await updatePost({
        ...data,
        id: post.id,
        authorId: post.authorId,
        authorName: post.authorName,
      });
      await push(`/blog/post?authorId=${post.authorId}&postId=${post.id}`);
      enqueueSnackbar('Update post successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar('Update post failed', {
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout title='Edit Post'>
      <LoadingWrapper loading={isLoading}>
        <form onSubmit={handleSubmit(handleUpdatePost)}>
          <Stack spacing={2.5} sx={{ mt: 6 }}>
            <Controller
              name='title'
              control={control}
              defaultValue={post?.title || ''}
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
              defaultValue={post?.content || ''}
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
              defaultValue={post?.published}
              rules={createPostValidation.published}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch {...field} defaultChecked={post?.published} />
                  }
                  label='Publish'
                />
              )}
            />
          </Stack>
          <Stack
            spacing={1}
            direction='row'
            justifyContent='center'
            sx={{ mt: 6, textAlign: 'center' }}
          >
            <Button type='submit' variant='contained' disableElevation>
              Update
            </Button>
            <Button
              variant='text'
              color='error'
              disableElevation
              onClick={async () => {
                await deletePost({ id: post!.id, authorId: post!.authorId });
                await push(`/users/${post?.authorId}/posts`);
              }}
            >
              Delete
            </Button>
          </Stack>
        </form>
      </LoadingWrapper>
    </PageLayout>
  );
}
