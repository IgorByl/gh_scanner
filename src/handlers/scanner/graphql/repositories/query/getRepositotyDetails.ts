import { GITHUB_URL } from '~/constants';
import {
  GetRepositoryDetailsArgs,
  GetRepositoryDetailsResponse,
  RepositoryDetails,
  Webhook,
} from '~/handlers/scanner/types';
import { getErrorMessage, getRepositoryFilesInfo } from '~/helpers';
import { GitHubRepositoryDetails, GitHubResource, GitHubYmlFile, RequestOptions } from '~/types';
import { fetchWithRetry } from '~/utils';

export async function getRepositoryDetails(
  args: GetRepositoryDetailsArgs
): Promise<GetRepositoryDetailsResponse> {
  let repoDetails;
  let activeWebhooks: Webhook[] = [];
  let ymlContent;
  let amountOfFiles;

  try {
    const {
      input: { repository, owner, token },
    } = args;

    const options: RequestOptions = {
      headers: {
        Authorization: `token ${token}`,
        'User-Agent': '',
      },
    };

    const details = await fetchWithRetry<GitHubRepositoryDetails>(
      `${GITHUB_URL}/repos/${owner}/${repository}`,
      options
    );

    if (details) {
      repoDetails = {
        name: details?.name,
        size: details?.size,
        owner: details?.owner?.login,
        status: details?.visibility,
      };

      const [filesInfo, webhooks] = await Promise.all([
        getRepositoryFilesInfo<GitHubResource>(
          `${GITHUB_URL}/repos/${owner}/${repository}/contents`,
          options,
          fetchWithRetry
        ),
        fetchWithRetry<Webhook[]>(`${GITHUB_URL}/repos/${owner}/${repository}/hooks`, options),
      ]);

      amountOfFiles = filesInfo.amount;

      if (Array.isArray(webhooks)) {
        activeWebhooks = webhooks.filter((hook) => hook.active);
      }

      let ymlFile: GitHubYmlFile;

      if (filesInfo.firstYmlPath) {
        ymlFile = await fetchWithRetry<GitHubYmlFile>(
          `${GITHUB_URL}/repos/${owner}/${repository}/contents/${filesInfo.firstYmlPath}`,
          options
        );

        ymlContent = Buffer.from(ymlFile.content, ymlFile.encoding).toString('utf-8');
      }
    } else {
      throw new Error('Resource is not found.');
    }

    return {
      success: true,
      data: {
        ...repoDetails,
        amountOfFiles,
        activeWebhooks,
        ymlContent,
      } as RepositoryDetails,
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
