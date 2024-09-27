import { makeExecutableSchema } from '@graphql-tools/schema';

import { defaultSchema } from './default';
import { repositoriesSchema } from './repositories/schema';

export const schema = makeExecutableSchema({
  typeDefs: [defaultSchema, repositoriesSchema],
  resolvers: [],
});
