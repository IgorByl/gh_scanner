export const defaultResolvers = {
  Query: {
    ping: (): string => `Query pong ${new Date().toISOString()}`,
  },
  Mutation: {
    ping: (): string => `Mutation pong ${new Date().toISOString()}`,
  },
};
