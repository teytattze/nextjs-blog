import {
  IPost,
  IUpdatePostData,
} from '../../../shared/interfaces/posts.interface';
import { useAuth } from '../../auth/auth.context';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import {
  deletePost,
  updatePost,
} from '../../../services/firestore-posts.service';
import { createPostValidation } from '../posts.lib';
import {
  Button,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from '@mui/material';
import { PageLayout } from '../../../layouts/page-layout';

type PostEditProps = { post?: IPost };

export default function PostEdit({ post }: PostEditProps) {
  const { account } = useAuth();
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUpdatePostData>();

  return (
    <PageLayout title='Edit Post'>
      <LoadingWrapper loading={false}>
        <form
          onSubmit={handleSubmit(async (data) => {
            if (!post) return;
            if (account && account.id !== post.authorId) return;
            await updatePost({
              ...data,
              id: post.id,
              authorId: post.authorId,
              authorName: post.authorName,
            });
            await router.push(
              `/blog/post?authorId=${post.authorId}&postId=${post.id}`,
            );
          })}
        >
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
                await router.push(`/users/${post?.authorId}/posts`);
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
