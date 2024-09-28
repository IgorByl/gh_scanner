import { makeExecutableSchema } from '@graphql-tools/schema';
import { constraintDirective, constraintDirectiveTypeDefs } from 'graphql-constraint-directive';

import { defaultSchema } from './default';
import { repositoriesSchema } from './repositories/schema';
import { repositoryResolvers } from './repositories';

const schema = makeExecutableSchema({
  typeDefs: [constraintDirectiveTypeDefs, defaultSchema, repositoriesSchema],
  resolvers: [repositoryResolvers],
});

export const schemaWithConstrains = constraintDirective()(schema);
