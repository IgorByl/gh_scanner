import { gql } from 'apollo-server-lambda';

export const defaultSchema = gql`
  type BasicError {
    type: String
    message: String
  }

  interface ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
  }
`;
