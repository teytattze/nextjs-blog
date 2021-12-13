import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NextComponentType } from 'next';
import NextLink from 'next/link';
import { IPost } from '../shared/interfaces/posts.interface';
import { theme } from '../styles/theme.style';
import { useAuth } from '../modules/auth/auth.context';
import { deletePost } from '../services/firestore-posts.service';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { formatTimestamp } from '../lib/utils';

type BlogLayoutProps = {
  post: IPost;
};

export const BlogLayout: NextComponentType<{}, {}, BlogLayoutProps> = ({
  children,
  post,
}) => {
  const { account } = useAuth();
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDelete = async () => {
    if (account?.id !== post.authorId) return;
    await deletePost({ id: post.id, authorId: post.authorId });
    await push('/');
    enqueueSnackbar('Post deleted successfully', {
      variant: 'success',
    });
  };

  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        spacing={1}
      >
        <Typography
          variant='h4'
          sx={{
            fontWeight: 600,
          }}
        >
          {post.title}
        </Typography>
        {account?.id === post.authorId &&
          (isMediumScreen ? (
            <Stack direction='row' alignItems='center' spacing={1}>
              <NextLink href={`/blog/${post.id}?edit=true`} shallow>
                <Button color='primary' endIcon={<EditIcon />}>
                  Edit
                </Button>
              </NextLink>
              <Button
                color='error'
                endIcon={<DeleteForeverIcon />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <Stack direction='row' alignItems='center'>
              <NextLink href={`/blog/${post.id}?edit=true`} shallow>
                <IconButton>
                  <EditIcon color='primary' />
                </IconButton>
              </NextLink>
              <IconButton onClick={handleDelete}>
                <DeleteForeverIcon color='error' />
              </IconButton>
            </Stack>
          ))}
      </Stack>
      <Divider sx={{ mt: 2, mb: 1 }} />
      <Stack
        sx={{ width: 1 }}
        direction={isMediumScreen ? 'row' : 'column-reverse'}
        justifyContent='space-between'
      >
        <Typography
          variant='caption'
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          By: {post.authorName}
        </Typography>
        <Typography
          variant='caption'
          sx={{
            color: 'text.secondary',
            fontWeight: 600,
          }}
        >
          Created At: {formatTimestamp(post.createdAt)}
        </Typography>
      </Stack>
      <Box sx={{ mt: 6 }}>{children}</Box>
    </>
  );
};
