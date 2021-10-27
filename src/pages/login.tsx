import {
	Alert,
	Button,
	Box,
	Divider,
	Link,
	Paper,
	Stack,
	TextField,
	ClickAwayListener,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from 'react';
import { NextPage } from 'next';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../modules/auth/auth.context';
import { ILoginData } from '../shared/interfaces/auth.interface';
import { defaultLoginValue, loginValidation } from '../modules/auth/auth.lib';
import { handleLoginError } from '../modules/auth/auth.error';
import { LoadingWrapper } from '../components/loading-wrapper';
import { PageTitle } from '../components/page-title';

const LoginPage: NextPage = () => {
	const [errorMessage, setErrorMessage] = React.useState<string>('');

	const { loginWithEmailAndPassword, loading } = useAuth();
	const { enqueueSnackbar } = useSnackbar();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<ILoginData>();

	const handleLogin = async (data: ILoginData) => {
		try {
			await loginWithEmailAndPassword(data);
			enqueueSnackbar('You have logged in successfully', { variant: 'success' });
			reset(defaultLoginValue);
		} catch (err) {
			const message = handleLoginError(err);
			setErrorMessage(message);
		}
	};

	return (
		<Paper
			sx={{
				p: 5,
				mx: 'auto',
				width: '100%',
				maxWidth: '500px',
			}}
		>
			<LoadingWrapper loading={loading}>
				<PageTitle title="Sign In" />
				<form onSubmit={handleSubmit((data: ILoginData) => handleLogin(data))}>
					<Box sx={{ my: 5 }}>
						<Stack direction="column" spacing={2.5}>
							{Boolean(errorMessage) && (
								<ClickAwayListener onClickAway={() => setErrorMessage('')}>
									<Alert severity="error">{errorMessage}</Alert>
								</ClickAwayListener>
							)}
							<Controller
								name="email"
								control={control}
								defaultValue={defaultLoginValue.email}
								rules={loginValidation.email}
								render={({ field }) => (
									<TextField
										{...field}
										id="email"
										label="E-mail"
										variant="outlined"
										helperText={errors.email?.message}
										error={Boolean(errors.email)}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue={defaultLoginValue.password}
								rules={loginValidation.password}
								render={({ field }) => (
									<TextField
										{...field}
										id="password"
										type="password"
										label="Password"
										variant="outlined"
										helperText={errors.password?.message}
										error={Boolean(errors.password)}
									/>
								)}
							/>
						</Stack>
						<Box sx={{ textAlign: 'right' }}>
							<NextLink href="/forgot-password" passHref>
								<Link
									variant="caption"
									sx={{
										color: 'text.secondary',
										p: 0.5,
										cursor: 'pointer',
										':hover': {
											color: 'text.primary',
										},
										textDecoration: 'none',
									}}
								>
									Forgot Password?
								</Link>
							</NextLink>
						</Box>
					</Box>
					<LoadingButton
						type="submit"
						variant="contained"
						loading={loading}
						fullWidth
						disableElevation
					>
						Sign In
					</LoadingButton>
				</form>
				<Divider
					sx={{
						my: 2.5,
						color: 'text.disabled',
						fontWeight: 500,
						fontSize: 'caption.fontSize',
					}}
				>
					NO ACCOUNT?
				</Divider>
				<NextLink href="/login" passHref>
					<Button variant="text" endIcon={<ArrowForwardIcon />} fullWidth disableElevation>
						Sign Up Now
					</Button>
				</NextLink>
			</LoadingWrapper>
		</Paper>
	);
};

export default LoginPage;
