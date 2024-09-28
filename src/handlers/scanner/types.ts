import type { Context, APIGatewayProxyEventV2, APIGatewayProxyEventHeaders } from 'aws-lambda';

export interface ManagementContext {
  headers: APIGatewayProxyEventHeaders;
  functionName: string;
  event: APIGatewayProxyEventV2;
  context: Context;
  query: string;
}
export interface BasicError {
  type: string;
  message: string;
}

export type ReqParent = Record<string, unknown>;
export type RepositoryStatus = 'PUBLIC' | 'PRIVATE';
export type RepositoryOwner = 'USER' | 'ORGANIZATION';

export interface BasicResponseWithErrors<T> {
  success: boolean;
  errors?: BasicError[];
  data?: T[];
}

export type Repository = {
  name: string;
  size: string;
  owner: string;
};

export type RepositoryDetails = Repository & {
  status: RepositoryStatus;
  filesAmount: number;
  activeWebhooks: [string];
  ymlContent: string;
};

type RepositoryProfile = {
  owner: string;
  type: RepositoryOwner;
};

export type GetRepositoriesInput = {
  profile: RepositoryProfile;
  token: string;
};

export type GetRepositoryDetailsInput = {
  repository: string;
  token: string;
  owner: string;
};

export type GetRepositoriesArgs = {
  input: GetRepositoriesInput;
};

export type GetRepositoryDetailsArgs = {
  input: GetRepositoryDetailsInput;
};

export interface GetRepositoriesResponse extends BasicResponseWithErrors<Repository> {}

export interface GetRepositoryDetailsResponse extends BasicResponseWithErrors<RepositoryDetails> {}
