import * as React from 'react';
import {
	Button,
	ButtonProps,
	BottomNavigation,
	BottomNavigationAction,
	Box,
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

export function Navbar() {
	const theme = useTheme();
	const isDefault = useMediaQuery(theme.breakpoints.up('md'));

	const { user } = useAuth();

	return (
		<Box
			component="div"
			sx={{
				width: '100%',
				height: '5rem',
				backgroundColor: 'white',
				position: 'fixed',
				top: 0,
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			<Container
				maxWidth="xl"
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<Logo />
				<DefaultLinks isDefault={isDefault} isAuthenticated={Boolean(user)} />
			</Container>
			{!isDefault && user && <BottomLinks />}
		</Box>
	);
}

export function Logo() {
	return (
		<NextLink href="/" passHref>
			<Link
				variant="h6"
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
	isAuthenticated: boolean;
};

export function DefaultLinks({ isDefault, isAuthenticated }: DefaultLinksProps) {
	const { user, logout } = useAuth();
	const router = useRouter();
	const { enqueueSnackbar } = useSnackbar();

	const checkPath = (pathname: string) => {
		if (router.pathname === '/' && pathname === '/') return true;
		if (pathname !== '/') {
			const isActive = router.pathname === pathname || router.pathname.indexOf(pathname) === 0;
			return isActive;
		}
	};

	const handleLogout = async () => {
		try {
			await logout();
			enqueueSnackbar('You have logged out successfully!', { variant: 'success' });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			{isAuthenticated ? (
				<Stack direction="row" spacing={3}>
					{isDefault && (
						<>
							<Stack direction="row" spacing={1.5}>
								<DefaultNavLink variant="text" color="inherit" href="/" isActive={checkPath('/')}>
									Home
								</DefaultNavLink>
								<DefaultNavLink
									variant="text"
									color="inherit"
									href={`/${user?.id}/posts`}
									isActive={checkPath('/posts')}
								>
									My Post
								</DefaultNavLink>
								<DefaultNavLink
									variant="text"
									color="inherit"
									href="/create-post"
									isActive={checkPath('/create-post')}
								>
									New Post
								</DefaultNavLink>
							</Stack>
							<Divider orientation="vertical" flexItem />
						</>
					)}
					<Button onClick={handleLogout} variant="outlined" size={isDefault ? 'medium' : 'small'}>
						Logout
					</Button>
				</Stack>
			) : (
				<Stack direction="row" spacing={1.5}>
					<Button
						variant="contained"
						size={isDefault ? 'medium' : 'small'}
						href="/login"
						disableElevation
					>
						Login
					</Button>
					<Button variant="outlined" size={isDefault ? 'medium' : 'small'} href="/register">
						Sign Up
					</Button>
				</Stack>
			)}
		</>
	);
}

export function BottomLinks() {
	const router = useRouter();
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
			<BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
			<BottomNavigationAction label="Post" value="/posts" icon={<ArticleIcon />} />
			<BottomNavigationAction label="Account" value="/account" icon={<PersonIcon />} />
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
