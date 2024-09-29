import { hasOwnProperty } from './hasOwnProperty';

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && hasOwnProperty(error, 'message')) {
    const message = error.message as string;

    return message;
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
  return `${error}`;
};
