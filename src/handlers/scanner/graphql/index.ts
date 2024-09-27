import { makeExecutableSchema } from '@graphql-tools/schema';

import { defaultResolvers, defaultSchema } from './default';

export const schema = makeExecutableSchema({
  typeDefs: [defaultSchema],
  resolvers: [defaultResolvers],
});
