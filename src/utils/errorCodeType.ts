import { ErrorCodeType } from '~/types';

export function getErrorMessageByCode(code: ErrorCodeType): string {
  let description = '';

  switch (code) {
    case 'INTERNAL_SERVER_ERROR':
      description = 'Internal Server Error.';
      break;

    case 'AUTHORIZATION_FAILED':
      description = 'The Auth Token is not valid.';
      break;

    case 'FORBIDDEN':
      description = 'The access is not allowed.';
      break;

    case 'NOT_FOUND':
      description = 'Resource is not found.';
      break;

    default:
      description = 'Unknown error.';
      break;
  }

  return `${description} Code: ${code}.`;
}
