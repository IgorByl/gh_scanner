function hasOwnProperty<X extends object, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return Object.hasOwnProperty.call(obj, prop);
}

export const getErrorMessage = (error: unknown): string => {
  if (!error) {
    return '';
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object' && hasOwnProperty(error, 'message')) {
    const message = error.message as string;
    const code = hasOwnProperty(error, 'code') ? (error.code as string) : '';

    switch (code) {
      case 'ResourceNotFoundException':
        if (message.includes('not found')) {
          return 'AUTHORIZATION_FAILED';
        }
        break;

      default:
        return message;
    }

    return message;
  }

  // eslint-disable-next-line @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions
  return `${error}`;
};
