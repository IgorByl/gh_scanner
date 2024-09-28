import { GraphQLError } from 'graphql';

import { getErrorMessageByCode } from '~/utils';

export const formatError = (error: GraphQLError): Error => {
  // eslint-disable-next-line no-console
  console.error('ApolloServer catch error:\n', JSON.stringify(error, null, 2));

  return new Error(error.message || getErrorMessageByCode('INTERNAL_SERVER_ERROR'));
};
