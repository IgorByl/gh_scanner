import { ApolloServer } from 'apollo-server-lambda';
import { ExpressContext } from 'apollo-server-express';
import type { Context, APIGatewayProxyEventV2 } from 'aws-lambda';

import { schemaWithConstrains as schema } from './graphql';
import { ManagementContext } from './types';

import { formatError } from '~/utils';

const apolloServer = new ApolloServer({
  schema,
  context: ({
    event,
    context,
    express,
  }: {
    event: APIGatewayProxyEventV2;
    context: Context;
    express: ExpressContext;
  }): ManagementContext => {
    console.log('Event: ', event);

    const { query } = express.req.body as { query: string; variables: Record<string, unknown> };

    return {
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
      query,
    };
  },
  formatError: (error): Error => formatError(error),
  introspection: true,
});

export const handler = apolloServer.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
});
