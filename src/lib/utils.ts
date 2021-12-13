import moment from 'moment';
import { nanoid } from 'nanoid';

export const createId = () => {
  return nanoid();
};

export const getCurrentTimestamp = () => {
  return moment().toISOString();
};

export const formatTimestamp = (timestamp: string) => {
  return moment(timestamp).format('DD/MM/YYYY');
};
