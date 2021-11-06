import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { useIndexPost } from '../../../modules/posts/posts.query';

const PostsListing: NextPage = () => {
  const { data: posts, isLoading } = useIndexPost({ published: true });
  const { query } = useRouter();

  return (
    <LoadingWrapper
      loading={isLoading}
      type='skeleton'
      renderSkeleton={() => (
        <Stack direction='column' spacing={2}>
          <Skeleton variant='rectangular' height={24} />
          <Skeleton variant='rectangular' height={24} />
          <Skeleton variant='rectangular' height={188} />
        </Stack>
      )}
    >
      {posts?.length ? (
        <Stack direction='column' spacing={4}>
          {posts
            .filter((post) => {
              return query.authorId ? query.authorId === post.authorId : post;
            })
            .map((post) => (
              <PostItem
                key={post.id}
                postId={post.id}
                username={post.authorId}
                title={post.title}
              />
            ))}
        </Stack>
      ) : (
        <Alert severity='info'>Sorry...Nobody submit a post yet!</Alert>
      )}
    </LoadingWrapper>
  );
};

type PostItemProps = {
  postId: string;
  username: string;
  title: string;
};

const PostItem = ({ postId, username, title }: PostItemProps) => {
  return (
    <NextLink href={`blog/${postId}`}>
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
        <Typography variant='h5'>{title}</Typography>
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

export default PostsListing;