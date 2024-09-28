import type { Context, APIGatewayProxyEventV2, APIGatewayProxyEventHeaders } from 'aws-lambda';

import { Owner } from '~/constants';

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
export type RepositoryStatus = 'public' | 'private';
export type RepositoryOwner = Owner.User | Owner.Organizarion;

export interface BasicResponseWithErrors<T> {
  success: boolean;
  errors?: BasicError[];
  data?: T;
}

export type Repository = {
  name: string;
  size: number;
  owner: string;
};

export type Webhook = {
  type: string;
  id: number;
  name: string;
  active: boolean;
  events: string[];
  config: {
    content_type: string;
    insecure_ssl: string;
    url: string;
  };
  updated_at: string;
  created_at: string;
  url: string;
  test_url: string;
  ping_url: string;
  deliveries_url: string;
  last_response: { code: number; status?: string; message: string };
};

export type RepositoryDetails = Repository & {
  status: RepositoryStatus;
  amountOfFiles: number;
  activeWebhooks: Webhook[];
  ymlContent?: string;
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

export interface GetRepositoriesResponse extends BasicResponseWithErrors<Repository[]> {}

export interface GetRepositoryDetailsResponse extends BasicResponseWithErrors<RepositoryDetails> {
  data?: RepositoryDetails;
}
