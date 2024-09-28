import Queue, { QueueWorkerCallback } from 'queue';

import {
  GetRepositoriesArgs,
  GetRepositoriesResponse,
  GetRepositoryDetailsArgs,
  GetRepositoryDetailsResponse,
  ReqParent,
} from '../../types';

import { getRepositories, getRepositoryDetails } from './query';

const queue = new Queue({ concurrency: 2, autostart: true });

export const repositoryResolvers = {
  Query: {
    getRepositories: (
      _parent: ReqParent,
      args: GetRepositoriesArgs
    ): Promise<GetRepositoriesResponse> => getRepositories(args),
    getRepositoryDetails: (
      _parent: ReqParent,
      args: GetRepositoryDetailsArgs
    ): Promise<GetRepositoryDetailsResponse> =>
      new Promise((resolve, reject) => {
        queue.push(async (cb) => {
          try {
            const details = await getRepositoryDetails(args);
            resolve(details);
          } catch (err) {
            reject(err);
          } finally {
            (cb as QueueWorkerCallback)();
          }
        });
      }),
  },
};
