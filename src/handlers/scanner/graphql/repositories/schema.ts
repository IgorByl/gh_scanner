import { gql } from 'apollo-server-lambda';

export const repositoriesSchema = gql`
  enum RepositoryStatus {
    public
    private
  }

  enum RepositoryOwner {
    USER
    ORGANIZATION
  }

  type Repository {
    name: String
    size: Int # size in kb
    owner: String
  }

  type WebhookConfig {
    content_type: String
    insecure_ssl: String
    url: String
  }
  type WebhookResponse {
    code: Int
    status: String
    message: String
  }

  type Webhook {
    type: String
    id: Int
    name: String
    active: Boolean
    events: [String]
    config: WebhookConfig
    updated_at: String
    created_at: String
    url: String
    test_url: String
    ping_url: String
    deliveries_url: String
    last_response: WebhookResponse
  }

  type RepositoryDetail {
    name: String
    size: Int
    owner: String
    status: RepositoryStatus
    amountOfFiles: Int
    activeWebhooks: [Webhook]
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
