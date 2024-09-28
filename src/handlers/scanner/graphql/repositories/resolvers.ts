import {
  GetRepositoriesArgs,
  GetRepositoriesResponse,
  // GetRepositoryDetailsArgs,
  // GetRepositoryDetailsResponse,
  ReqParent,
} from '../../types';

import { getRepositories } from './query';

export const repositoryResolvers = {
  Query: {
    getRepositories: (
      _parent: ReqParent,
      args: GetRepositoriesArgs
    ): Promise<GetRepositoriesResponse> => getRepositories(args),
    // getRepositoryDetails: (
    //   _parent: ReqParent,
    //   args: GetRepositoryDetailsArgs
    // ): Promise<GetRepositoryDetailsResponse> => getRepositoryDetails(args),
  },
};
