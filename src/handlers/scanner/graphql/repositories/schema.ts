import { gql } from 'apollo-server-lambda';

export const repositoriesSchema = gql`
  enum RepositoryStatus {
    PUBLIC
    PRIVATE
  }

  enum RepositoryOwner {
    USER
    ORGANIZATION
  }

  type Repository {
    name: String
    size: Int
    owner: String
  }

  type RepositoryDetail {
    name: String
    size: Int
    owner: String
    status: RepositoryStatus
    filesAmount: Int
    activeWebhooks: [String]
    ymlContent: String
  }

  input RepositoryProfile {
    owner: String! @constraint(minLength: 1)
    type: RepositoryOwner!
  }

  input GetRepositoriesInput {
    profile: RepositoryProfile
    token: String! @constraint(minLength: 1)
  }

  input GetRepositoryDetailsInput {
    repository: String! @constraint(minLength: 1)
    token: String! @constraint(minLength: 1)
    owner: String! @constraint(minLength: 1)
  }

  type GetRepositoriesResponse implements ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
    data: [Repository]
  }

  type GetRepositoryDetailsResponse implements ResponseWithErrors {
    success: Boolean
    errors: [BasicError]
    data: RepositoryDetail
  }

  extend type Query {
    getRepositories(input: GetRepositoriesInput!): GetRepositoriesResponse
    getRepositoryDetails(input: GetRepositoryDetailsInput!): GetRepositoryDetailsResponse
  }
`;
