import { GetRepositoriesArgs, GetRepositoriesResponse, Repository } from '~/handlers/scanner/types';
import { getErrorMessage, getRepositoryURL } from '~/helpers';
import { fetchWithRetry } from '~/utils';

export async function getRepositories(args: GetRepositoriesArgs): Promise<GetRepositoriesResponse> {
  try {
    const {
      input: {
        profile: { owner, type },
        token,
      },
    } = args;

    const response = await fetchWithRetry<Record<string, unknown>[]>(
      getRepositoryURL(owner, type),
      {
        headers: {
          Authorization: `token ${token}`,
          'User-Agent': '',
        },
      }
    );

    const data = [];

    if (Array.isArray(response)) {
      for (let i = 0; i < response.length; i += 1) {
        data.push({
          name: response[i]?.name,
          size: response[i]?.size,
          owner: (response[i]?.owner as Record<string, unknown>)?.login,
        } as Repository);
      }
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      errors: [
        {
          type: 'INTERNAL_SERVER_ERROR',
          message: getErrorMessage(error),
        },
      ],
    };
  }
}
