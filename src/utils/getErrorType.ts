import { ErrorCodeType } from '~/types';

export const getErrorType = (errorCodeType: ErrorCodeType): string => `${errorCodeType}`;
