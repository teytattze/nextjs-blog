import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { NextComponentType } from 'next';
import { IPost } from '../shared/interfaces/posts.interface';
import { IUser } from '../shared/interfaces/users.interface';
import { theme } from '../styles/theme.style';

type BlogLayoutProps = {
  post: IPost;
  author: IUser;
};

export const BlogLayout: NextComponentType<{}, {}, BlogLayoutProps> = ({
  children,
  post,
}) => {
  const isMediumScreen = useMediaQuery(theme.breakpoints.up('sm'));

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
        {isMediumScreen ? (
          <Stack direction='row' alignItems='center' spacing={1}>
            <Button color='primary' endIcon={<EditIcon />}>
              Edit
            </Button>
            <Button color='error' endIcon={<DeleteForeverIcon />}>
              Delete
            </Button>
          </Stack>
        ) : (
          <Stack direction='row' alignItems='center'>
            <IconButton>
              <EditIcon color='primary' />
            </IconButton>
            <IconButton>
              <DeleteForeverIcon color='error' />
            </IconButton>
          </Stack>
        )}
      </Stack>
      <Box sx={{ mt: 4 }}>{children}</Box>
    </>
  );
};
