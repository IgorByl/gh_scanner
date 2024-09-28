import { ErrorCodeType } from '~/types';

export function getErrorMessageByCode(code: ErrorCodeType): string {
  let description = '';

  switch (code) {
    case 'INTERNAL_SERVER_ERROR':
      description = 'Internal Server Error.';
      break;

    case 'TOKEN_IS_NOT_PROVIDEN':
      description = 'The Auth Token is not provided.';
      break;

    case 'USER_TOKEN_EXPIRED':
      description = 'User token expired.';
      break;

    default:
      description = 'Unknown error.';
      break;
  }

  return `${description} Code: ${code}.`;
}
