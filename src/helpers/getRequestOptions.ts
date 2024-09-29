import { RequestOptions } from '~/types/RequestOptions';

export const getRequestOptions = (token: string): RequestOptions => ({
  headers: {
    Authorization: `token ${token}`,
    'User-Agent': '',
  },
});
