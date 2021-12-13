import { Alert, IconButton, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { IPost } from '../../../shared/interfaces/posts.interface';
import { useAuth } from '../../auth/auth.context';

type PostsListingProps = {
  posts?: IPost[];
};

export function PostsListing({ posts }: PostsListingProps) {
  const { query } = useRouter();
  return (
    <>
      {posts?.length ? (
        <Stack direction='column' spacing={4}>
          {posts
            .filter((post) => {
              return query.authorId ? query.authorId === post.authorId : post;
            })
            .map((post) => (
              <PostItem
                key={post.id}
                authorId={post.authorId}
                id={post.id}
                username={post.authorName}
                title={post.title}
              />
            ))}
        </Stack>
      ) : (
        <Alert severity='info'>Sorry...No article available yet!</Alert>
      )}
    </>
  );
}

type PostItemProps = {
  authorId: string;
  id: string;
  username: string;
  title: string;
};

const PostItem = ({ id, username, title, authorId }: PostItemProps) => {
  const { account } = useAuth();

  return (
    <NextLink href={`/blog/${id}`} shallow>
      <Stack
        direction='column'
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
            borderColor: 'transparent',
            boxShadow: 6,
          },
        }}
      >
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography
            variant='h5'
            sx={{
              margin: 0,
            }}
          >
            {title}
          </Typography>
          {account?.id === authorId && (
            <NextLink href={`/blog/${id}?edit=true`}>
              <IconButton size='small'>
                <EditIcon color='primary' />
              </IconButton>
            </NextLink>
          )}
        </Stack>
        <Typography
          variant='caption'
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
};
