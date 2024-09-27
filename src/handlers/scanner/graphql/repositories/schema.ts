import { gql } from 'apollo-server-lambda';

export const repositoriesSchema = gql`
  enum RepositoryStatus {
    PUBLIC
    PRIVATE
  }

  type Repository {
    name: String
    size: String
    owner: String
  }

  type RepositoryDetail {
    name: String
    size: String
    owner: String
    status: RepositoryStatus
    filesAmount: Int
    activeWebhooks: [String]
    ymlContent: String
  }

  input GetRepositoriesInput {
    profile: String!
    token: String!
  }

  input GetRepositoryDetailsInput {
    repository: String!
    token: String!
  }

  type GetRepositoriesResponse implements ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
    doc: [Repository]
  }

  type GetRepositoryDetailsResponse implements ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
    doc: RepositoryDetail
  }

  extend type Query {
    getRepositories(input: GetRepositoriesInput!): GetRepositoriesResponse
    getRepositoryDetails(input: GetRepositoryDetailsInput!): GetRepositoryDetailsResponse
  }
`;
