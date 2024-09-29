import { getRepositories } from './getRepositories';

import { fetchWithRetry } from '~/utils';
import { getRepositoryURL, getRequestOptions } from '~/helpers';
import { GetRepositoriesArgs } from '~/handlers/scanner/types';
import { Owner } from '~/constants';
import { GitHubRepositoryDetails } from '~/types';

jest.mock('~/utils', () => ({
  fetchWithRetry: jest.fn(),
  getErrorMessage: jest.fn(),
  getErrorType: jest.fn(),
}));

jest.mock('~/helpers', () => ({
  getRepositoryURL: jest.fn(),
  getRequestOptions: jest.fn(),
}));

describe('getRepositories', () => {
  const mockArgs: GetRepositoriesArgs = {
    input: {
      profile: {
        owner: 'mockOwner',
        type: 'mockType' as Owner,
      },
      token: 'mockToken',
    },
  };

  const mockRepositoriesResponse: Partial<GitHubRepositoryDetails>[] = [
    {
      name: 'repo1',
      size: 100,
      owner: {
        login: 'owner1',
      } as GitHubRepositoryDetails['owner'],
    },
    {
      name: 'repo2',
      size: 200,
      owner: {
        login: 'owner2',
      } as GitHubRepositoryDetails['owner'],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a successful response with repository data', async () => {
    (getRepositoryURL as jest.Mock).mockReturnValue('mockURL');
    (getRequestOptions as jest.Mock).mockReturnValue({
      headers: { Authorization: 'token mockToken', 'User-Agent': '' },
    });
    (fetchWithRetry as jest.Mock).mockResolvedValue(mockRepositoriesResponse);

    const result = await getRepositories(mockArgs);

    expect(getRepositoryURL).toHaveBeenCalledWith('mockOwner', 'mockType');
    expect(getRequestOptions).toHaveBeenCalledWith('mockToken');
    expect(fetchWithRetry).toHaveBeenCalledWith('mockURL', {
      headers: { Authorization: 'token mockToken', 'User-Agent': '' },
    });
    expect(result).toEqual({
      success: true,
      data: [
        {
          name: 'repo1',
          size: 100,
          owner: 'owner1',
        },
        {
          name: 'repo2',
          size: 200,
          owner: 'owner2',
        },
      ],
    });
  });
});
