import { RegisterOptions } from 'react-hook-form';
import { ICreatePostData } from '../../shared/interfaces/posts.interface';

export const defaultCreatePostValue: ICreatePostData = {
  title: '',
  content: '',
  published: false,
  authorId: '',
  authorName: '',
};

export const createPostValidation: Record<
  ICreatePostData['title' | 'content'],
  RegisterOptions
> = {
  title: {
    required: 'This field is required',
    minLength: {
      value: 2,
      message: 'The minimum characters is 2',
    },
    maxLength: {
      value: 50,
      message: 'The maximum characters is 50',
    },
  },
  content: {
    required: 'This field is required',
    minLength: {
      value: 10,
      message: 'The minimum characters is 10',
    },
  },
};
