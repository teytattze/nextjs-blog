import {
  Alert,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Link,
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
import { ILoginData } from '../../../shared/interfaces/auth.interface';
import { defaultLoginValue, loginValidation } from '../auth.lib';
import { handleLoginError } from '../auth.error';
import {
  loginWithCredentials,
  loginWithGoogle,
} from '../../../services/firestore-auth.service';
import { useAuth } from '../auth.context';
import { useRouter } from 'next/router';

export function LoginForm() {
  const [errMessage, setErrMessage] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { account } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ILoginData>();

  const handleLogin = async (data: ILoginData) => {
    setIsLoading(true);
    try {
      await loginWithCredentials(data);
      enqueueSnackbar('Login successfully', {
        variant: 'success',
      });
    } catch (error) {
      const message = handleLoginError(error);
      setErrMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
  };

  React.useEffect(() => {
    if (!account) return;
    push('/');
  }, [account]);

  return (
    <Paper
      sx={{
        p: 5,
        mx: 'auto',
        width: '100%',
        maxWidth: '500px',
      }}
    >
      <LoadingWrapper loading={isLoading}>
        <PageTitle title='Sign In' />
        <form onSubmit={handleSubmit((data: ILoginData) => handleLogin(data))}>
          <Box sx={{ my: 5 }}>
            <Stack direction='column' spacing={2.5}>
              {Boolean(errMessage) && (
                <ClickAwayListener onClickAway={() => setErrMessage('')}>
                  <Alert severity='error'>{errMessage}</Alert>
                </ClickAwayListener>
              )}
              <Controller
                name='email'
                control={control}
                defaultValue={defaultLoginValue.email}
                rules={loginValidation.email}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='email'
                    label='E-mail'
                    variant='outlined'
                    helperText={errors.email?.message}
                    error={Boolean(errors.email)}
                  />
                )}
              />
              <Controller
                name='password'
                control={control}
                defaultValue={defaultLoginValue.password}
                rules={loginValidation.password}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='password'
                    type='password'
                    label='Password'
                    variant='outlined'
                    helperText={errors.password?.message}
                    error={Boolean(errors.password)}
                  />
                )}
              />
            </Stack>
            <Box sx={{ textAlign: 'right' }}>
              <Link
                variant='caption'
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
            </Box>
          </Box>
          <LoadingButton
            type='submit'
            variant='contained'
            loading={isLoading}
            fullWidth
            disableElevation
          >
            Sign In
          </LoadingButton>
          <Box sx={{ my: 1 }} />
          <GoogleButton
            title='Sign In with Google'
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
          NO ACCOUNT?
        </Divider>
        <NextLink href='/register' passHref>
          <Button
            variant='text'
            endIcon={<ArrowForwardIcon />}
            fullWidth
            disableElevation
          >
            Sign Up Now
          </Button>
        </NextLink>
      </LoadingWrapper>
    </Paper>
  );
}
