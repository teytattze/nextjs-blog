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
import { useSnackbar } from 'notistack';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../modules/auth/auth.context';
import { defaultRegistrationValue, registrationValidation } from '../modules/auth/auth.lib';
import { LoadingWrapper } from '../components/loading-wrapper';
import { PageTitle } from '../components/page-title';
import { IRegisterData } from '../shared/interfaces/auth.interface';
import { handleRegisterError } from '../modules/auth/auth.error';

const RegisterPage = () => {
	const [errorMessage, setErrorMessage] = React.useState<string>('');

	const { registerWithEmailAndPassword, loading } = useAuth();
	const { enqueueSnackbar } = useSnackbar();

	const {
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<IRegisterData>();

	const handleRegister = async (data: IRegisterData) => {
		try {
			await registerWithEmailAndPassword(data);
			enqueueSnackbar('You have signed up successfully!', { variant: 'success' });
			reset(defaultRegistrationValue);
		} catch (err) {
			const message = handleRegisterError(err);
			setErrorMessage(message);
		}
	};

	return (
		<Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
			<LoadingWrapper loading={loading}>
				<PageTitle title="Sign Up" />
				<form onSubmit={handleSubmit((data: IRegisterData) => handleRegister(data))}>
					<Box sx={{ my: 5 }}>
						<Stack direction="column" spacing={2.5}>
							{Boolean(errorMessage) && (
								<ClickAwayListener onClickAway={() => setErrorMessage('')}>
									<Alert severity="error">{errorMessage}</Alert>
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
						loading={loading}
						fullWidth
						disableElevation
					>
						Sign Up
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

export default RegisterPage;
