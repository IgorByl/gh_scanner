import { getRepositoryDetails } from './getRepositotyDetails';

import { fetchWithRetry } from '~/utils';
import { getRepositoryFilesInfo, getRequestOptions } from '~/helpers';
import { GITHUB_URL } from '~/constants';
import { GetRepositoryDetailsArgs } from '~/handlers/scanner/types';

jest.mock('~/utils', () => ({
  fetchWithRetry: jest.fn(),
  getErrorMessage: jest.fn(),
  getErrorType: jest.fn(),
}));

jest.mock('~/helpers', () => ({
  getRepositoryFilesInfo: jest.fn(),
  getRequestOptions: jest.fn(),
}));

describe('getRepositoryDetails', () => {
  const mockArgs: GetRepositoryDetailsArgs = {
    input: {
      repository: 'repo-name',
      owner: 'owner-name',
      token: 'some-token',
    },
  };

  const mockDetails = {
    name: 'repo-name',
    size: 1234,
    owner: {
      login: 'owner-name',
    },
    visibility: 'public',
  };

  const mockFilesInfo = {
    amount: 10,
    firstYmlPath: 'some/path/to/file.yml',
  };

  const mockWebhooks = [
    { active: true, id: 1 },
    { active: false, id: 2 },
  ];

  const mockYmlFile = {
    content: Buffer.from('yml content').toString('base64'),
    encoding: 'base64',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return repository details successfully', async () => {
    (fetchWithRetry as jest.Mock).mockResolvedValueOnce(mockDetails);
    (getRepositoryFilesInfo as jest.Mock).mockResolvedValueOnce(mockFilesInfo);
    (fetchWithRetry as jest.Mock).mockResolvedValueOnce(mockWebhooks);
    (fetchWithRetry as jest.Mock).mockResolvedValueOnce(mockYmlFile);

    const result = await getRepositoryDetails(mockArgs);

    expect(result).toEqual({
      success: true,
      data: {
        name: 'repo-name',
        size: 1234,
        owner: 'owner-name',
        status: 'public',
        amountOfFiles: 10,
        activeWebhooks: [{ active: true, id: 1 }],
        ymlContent: 'yml content',
      },
    });
    expect(fetchWithRetry).toHaveBeenCalledWith(
      `${GITHUB_URL}/repos/owner-name/repo-name`,
      getRequestOptions('some-token')
    );
    expect(getRepositoryFilesInfo).toHaveBeenCalledWith(
      `${GITHUB_URL}/repos/owner-name/repo-name/contents`,
      getRequestOptions('some-token'),
      fetchWithRetry
    );
    expect(fetchWithRetry).toHaveBeenCalledWith(
      `${GITHUB_URL}/repos/owner-name/repo-name/hooks`,
      getRequestOptions('some-token')
    );
    expect(fetchWithRetry).toHaveBeenCalledWith(
      `${GITHUB_URL}/repos/owner-name/repo-name/contents/some/path/to/file.yml`,
      getRequestOptions('some-token')
    );
  });
});
