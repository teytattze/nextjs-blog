import { AuthError, AuthErrorCodes } from '@firebase/auth';

export const handleRegisterError = (err: any) => {
  const { code } = err as AuthError;
  switch (code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      return 'This email has been taken!';
    case AuthErrorCodes.INVALID_EMAIL:
      return 'This email is invalid!';
    default:
      return 'Server internal error! Please try again later.';
  }
};

export const handleLoginError = (err: any) => {
  const { code } = err as AuthError;
  switch (code) {
    case AuthErrorCodes.INVALID_PASSWORD:
      return 'Wrong user credentials!';
    case AuthErrorCodes.USER_DELETED:
      return 'Wrong user credentials!';
    default:
      return 'Server internal error! Please try again later.';
  }
};
