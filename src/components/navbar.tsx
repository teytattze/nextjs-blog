import * as React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  ButtonProps,
  Container,
  Divider,
  Link,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';
import { useAuth } from '../modules/auth/auth.context';
import { useSnackbar } from 'notistack';
import { useLogout } from '../modules/auth/auth.query';

export function Navbar() {
  const theme = useTheme();
  const isDefault = useMediaQuery(theme.breakpoints.up('md'));

  const { account } = useAuth();

  return (
    <Box
      component='div'
      sx={{
        width: '100%',
        height: '5rem',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        borderBottom: 1,
        borderColor: 'divider',
        zIndex: 'appBar',
      }}
    >
      <Container
        maxWidth='md'
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />
        <DefaultLinks isDefault={isDefault} />
      </Container>
      {!isDefault && account && <BottomLinks />}
    </Box>
  );
}

export function Logo() {
  return (
    <NextLink href='/' passHref>
      <Link
        data-testid='nav-link-logo'
        variant='h6'
        sx={{
          cursor: 'pointer',
          color: 'text.primary',
          fontFamily: 'fontTitle',
          fontWeight: 'bold',
          ':hover': {
            textDecoration: 'none',
          },
          textDecoration: 'none',
        }}
      >
        MyBlog
      </Link>
    </NextLink>
  );
}

type DefaultLinksProps = {
  isDefault: boolean;
};

export function DefaultLinks({ isDefault }: DefaultLinksProps) {
  const { account } = useAuth();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { mutate: logout } = useLogout({
    onSuccess: () => {
      enqueueSnackbar('Logout successfully!', { variant: 'success' });
    },
  });

  const checkPath = (pathname: string) => {
    if (router.pathname === '/' && pathname === '/') return true;
    if (pathname !== '/') {
      return (
        router.pathname === pathname || router.pathname.indexOf(pathname) === 0
      );
    }
  };

  return (
    <>
      {Boolean(account) ? (
        <Stack direction='row' spacing={3}>
          {isDefault && (
            <>
              <Stack direction='row' spacing={1.5}>
                <DefaultNavLink
                  variant='text'
                  color='inherit'
                  href='/'
                  isActive={checkPath('/')}
                >
                  Home
                </DefaultNavLink>
                <DefaultNavLink
                  variant='text'
                  color='inherit'
                  href={`/users/${account?.id}/posts`}
                  isActive={checkPath('/users')}
                >
                  My Posts
                </DefaultNavLink>
                <DefaultNavLink
                  variant='text'
                  color='inherit'
                  href='/blog/new'
                  isActive={checkPath('/blog')}
                >
                  New
                </DefaultNavLink>
              </Stack>
              <Divider orientation='vertical' flexItem />
            </>
          )}
          <Button
            onClick={() => logout()}
            variant='outlined'
            size={isDefault ? 'medium' : 'small'}
          >
            Logout
          </Button>
        </Stack>
      ) : (
        <Stack direction='row' spacing={1.5}>
          <Button
            data-testid='nav-link-login'
            variant='contained'
            size={isDefault ? 'medium' : 'small'}
            href='/login'
            disableElevation
          >
            Login
          </Button>
          <Button
            data-testid='nav-link-register'
            variant='outlined'
            size={isDefault ? 'medium' : 'small'}
            href='/register'
          >
            Sign Up
          </Button>
        </Stack>
      )}
    </>
  );
}

export function BottomLinks() {
  const router = useRouter();
  const { account } = useAuth();
  const [value, setValue] = React.useState(router.pathname);

  const handleChange = (ev: React.SyntheticEvent, newValue: string) => {
    router.push(newValue);
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', zIndex: 'appBar', bottom: 0 }}
      value={value}
      onChange={handleChange}
      showLabels
    >
      <BottomNavigationAction label='Home' value='/' icon={<HomeIcon />} />
      <BottomNavigationAction
        label='My Posts'
        value={`/users/${account?.id}/posts`}
        icon={<ArticleIcon />}
      />
      <BottomNavigationAction
        label='New'
        value='/blog/new'
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  );
}

type DefaultNavLinkProps = {
  children: React.ReactNode;
  href: string | UrlObject;
  isActive?: boolean;
} & Omit<ButtonProps, 'href' | 'children'>;

export function DefaultNavLink({
  children,
  href,
  isActive = false,
  ...props
}: DefaultNavLinkProps) {
  return (
    <NextLink href={href} passHref>
      <Button
        {...props}
        sx={{
          backgroundColor: isActive ? 'grey.100' : 'inherit',
        }}
      >
        {children}
      </Button>
    </NextLink>
  );
}
