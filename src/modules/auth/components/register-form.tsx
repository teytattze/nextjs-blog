import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import * as React from 'react';
import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { LoadingWrapper } from '../../../components/loading-wrapper';
import { PageTitle } from '../../../components/page-title';
import { GoogleButton } from '../../../components/google-button';
import { IRegisterData } from '../../../shared/interfaces/auth.interface';
import { defaultRegistrationValue, registrationValidation } from '../auth.lib';
import { handleRegisterError } from '../auth.error';
import {
  loginWithGoogle,
  registerWithCredentials,
} from '../../../services/firestore-auth.service';

export function RegisterForm() {
  const [errMessage, setErrMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IRegisterData>();

  const handleRegister = async (data: IRegisterData) => {
    setIsLoading(true);
    try {
      await registerWithCredentials(data);
      enqueueSnackbar(
        'An verification email link has been sent to your email address',
        {
          variant: 'success',
        },
      );
    } catch (error) {
      const message = handleRegisterError(error);
      setErrMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
  };

  return (
    <Paper sx={{ p: 5, mx: 'auto', width: '100%', maxWidth: '500px' }}>
      <LoadingWrapper loading={isLoading}>
        <PageTitle title='Sign Up' />
        <form
          onSubmit={handleSubmit((data: IRegisterData) => handleRegister(data))}
        >
          <Box sx={{ my: 5 }}>
            <Stack direction='column' spacing={2.5}>
              {Boolean(errMessage) && (
                <ClickAwayListener onClickAway={() => setErrMessage('')}>
                  <Alert severity='error'>{errMessage}</Alert>
                </ClickAwayListener>
              )}
              <Controller
                name='firstName'
                control={control}
                defaultValue={defaultRegistrationValue.firstName}
                rules={registrationValidation.firstName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='First Name'
                    variant='outlined'
                    helperText={errors.firstName?.message}
                    error={Boolean(errors.firstName)}
                  />
                )}
              />
              <Controller
                name='lastName'
                control={control}
                defaultValue={defaultRegistrationValue.lastName}
                rules={registrationValidation.lastName}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Last Name'
                    variant='outlined'
                    helperText={errors.lastName?.message}
                    error={Boolean(errors.lastName)}
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                defaultValue={defaultRegistrationValue.email}
                rules={registrationValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label='Email'
                    variant='outlined'
                    helperText={errors.email?.message}
                    error={Boolean(errors.email)}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue={defaultRegistrationValue.password}
                rules={registrationValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type='password'
                    label='Password'
                    variant='outlined'
                    helperText={errors.password?.message}
                    error={Boolean(errors.password)}
                  />
                )}
              />
            </Stack>
          </Box>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isLoading}
            fullWidth
            disableElevation
          >
            Sign Up
          </LoadingButton>
          <Box sx={{ my: 1 }} />
          <GoogleButton
            title='Sign Up with Google'
            fullWidth
            disableElevation
            onClick={handleLoginWithGoogle}
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
        <NextLink href='/login' passHref>
          <Button
            variant='text'
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign In Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}

export default RegisterForm;
