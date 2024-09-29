import { GetRepositoriesArgs, GetRepositoriesResponse, Repository } from '~/handlers/scanner/types';
import { getRepositoryURL, getRequestOptions } from '~/helpers';
import { GitHubRepositoryDetails } from '~/types';
import { fetchWithRetry, getErrorMessage, getErrorType } from '~/utils';

export async function getRepositories(args: GetRepositoriesArgs): Promise<GetRepositoriesResponse> {
  try {
    const {
      input: {
        profile: { owner, type },
        token,
      },
    } = args;

    const response = await fetchWithRetry<GitHubRepositoryDetails[]>(
      getRepositoryURL(owner, type),
      getRequestOptions(token)
    );

    const data: Repository[] = [];

    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i += 1) {
        data.push({
          name: response[i]?.name,
          size: response[i]?.size,
          owner: response[i]?.owner?.login,
        });
      }
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      errors: [
        {
          type: getErrorType('INTERNAL_SERVER_ERROR'),
          message: getErrorMessage(error),
        },
      ],
    };
  }
}
