import { gql } from 'apollo-server-lambda';
import { JSONObjectDefinition, JSONDefinition } from 'graphql-scalars';

export const defaultSchema = gql`
  ${JSONObjectDefinition}

  ${JSONDefinition}

  type BasicError {
    type: String
    message: String
  }

  interface ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
  }

  interface Response {
    success: Boolean
    error: String
  }

  type Query {
    ping: String
  }

  type Mutation {
    ping: String
  }

  enum Sorting {
    DESC
    ASC
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;
