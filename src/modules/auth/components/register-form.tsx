import {
	Button,
	Box,
	Divider,
	Paper,
	Stack,
	TextField,
	ClickAwayListener,
	Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { PageTitle } from '../../../components/page-title';
import { GoogleButton } from '../../../components/google-button';
import { IRegisterData } from '../../../shared/interfaces/auth.interface';
import { defaultRegistrationValue, registrationValidation } from '../auth.lib';
import { useLoginWithGoogle, useRegisterWithCredentials } from '../auth.query';
import { handleRegisterError } from '../auth.error';

const RegisterForm = () => {
	const [error, setError] = React.useState<string>('');

	const { enqueueSnackbar } = useSnackbar();
	const { push } = useRouter();

	const { mutate: registerWithCredentials, isLoading } = useRegisterWithCredentials();
	const { mutate: loginWithGoogle } = useLoginWithGoogle({
		onSuccess: () => {
			enqueueSnackbar('Sign up successfully!', {
				variant: 'success',
			});
			push('/');
		},
	});

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<IRegisterData>();

	const handleRegister = async (data: IRegisterData) => {
		await registerWithCredentials(data, {
			onSuccess: () => {
				enqueueSnackbar('An verification email link has been sent to your email address', {
					variant: 'success',
				});
				reset(defaultRegistrationValue);
				push('/');
			},
			onError: (error) => {
				const message = handleRegisterError(error);
				setError(message);
			},
		});
	};

	return (
		<Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
			<LoadingWrapper loading={isLoading}>
				<PageTitle title="Sign Up" />
				<form onSubmit={handleSubmit((data: IRegisterData) => handleRegister(data))}>
					<Box sx={{ my: 5 }}>
						<Stack direction="column" spacing={2.5}>
							{Boolean(error) && (
								<ClickAwayListener onClickAway={() => setError('')}>
									<Alert severity="error">{error}</Alert>
								</ClickAwayListener>
							)}
							<Controller
								name="firstName"
								control={control}
								defaultValue={defaultRegistrationValue.firstName}
								rules={registrationValidation.firstName}
								render={({ field }) => (
									<TextField
										{...field}
										label="First Name"
										variant="outlined"
										helperText={errors.firstName?.message}
										error={Boolean(errors.firstName)}
									/>
								)}
							/>
							<Controller
								name="lastName"
								control={control}
								defaultValue={defaultRegistrationValue.lastName}
								rules={registrationValidation.lastName}
								render={({ field }) => (
									<TextField
										{...field}
										label="Last Name"
										variant="outlined"
										helperText={errors.lastName?.message}
										error={Boolean(errors.lastName)}
									/>
								)}
							/>
							<Controller
								name="email"
								control={control}
								defaultValue={defaultRegistrationValue.email}
								rules={registrationValidation.email}
								render={({ field }) => (
									<TextField
										{...field}
										label="Email"
										variant="outlined"
										helperText={errors.email?.message}
										error={Boolean(errors.email)}
									/>
								)}
							/>
							<Controller
								name="password"
								control={control}
								defaultValue={defaultRegistrationValue.password}
								rules={registrationValidation.password}
								render={({ field }) => (
									<TextField
										{...field}
										type="password"
										label="Password"
										variant="outlined"
										helperText={errors.password?.message}
										error={Boolean(errors.password)}
									/>
								)}
							/>
						</Stack>
					</Box>
					<LoadingButton
						type="submit"
						variant="contained"
						loading={isLoading}
						fullWidth
						disableElevation
					>
						Sign Up
					</LoadingButton>
					<Box sx={{ my: 1 }} />
					<GoogleButton
						title="Sign Up with Google"
						fullWidth
						disableElevation
						onClick={() => loginWithGoogle()}
					/>
				</form>
				<Divider
					sx={{
						my: 2.5,
						color: 'text.disabled',
						fontWeight: 500,
						fontSize: 'caption.fontSize',
					}}
				>
					HAVE ACCOUNT?
				</Divider>
				<NextLink href="/login" passHref>
					<Button variant="text" endIcon={<ArrowForwardIcon />} fullWidth disableElevation>
						Sign In Now
					</Button>
				</NextLink>
			</LoadingWrapper>
		</Paper>
	);
};

export default RegisterForm;
