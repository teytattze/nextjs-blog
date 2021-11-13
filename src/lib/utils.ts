import moment from 'moment';
import { nanoid } from 'nanoid';

export const createId = () => {
  return nanoid();
};

export const getCurrentTimestamp = () => {
  return moment().toISOString();
};
