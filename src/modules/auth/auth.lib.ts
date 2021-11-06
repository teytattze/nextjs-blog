import { RegisterOptions } from 'react-hook-form';
import {
  ILoginData,
  IRegisterData,
} from '../../shared/interfaces/auth.interface';

const emailReg =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const defaultLoginValue: ILoginData = {
  email: '',
  password: '',
};

export const loginValidation: Record<
  ILoginData['email' | 'password'],
  RegisterOptions
> = {
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'This field is required',
  },
};

export const defaultRegistrationValue = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const registrationValidation: Record<
  IRegisterData['email' | 'password'],
  RegisterOptions
> = {
  firstName: {},
  lastName: {},
  email: {
    required: 'This field is required',
    pattern: {
      value: emailReg,
      message: 'Invalid email address',
    },
  },
  password: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
