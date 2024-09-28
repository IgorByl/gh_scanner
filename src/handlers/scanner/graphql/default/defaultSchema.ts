import { gql } from 'apollo-server-lambda';

export const defaultSchema = gql`
  directive @constraint(minLength: Int) on INPUT_FIELD_DEFINITION

  type BasicError {
    type: String
    message: String
  }

  interface ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
  }

  type Query {
    ping: String
  }
`;
