import { GITHUB_URL } from '~/constants';
import {
  GetRepositoryDetailsArgs,
  GetRepositoryDetailsResponse,
  RepositoryDetails,
  Webhook,
} from '~/handlers/scanner/types';
import { getRepositoryFilesInfo, getRequestOptions } from '~/helpers';
import { GitHubRepositoryDetails, GitHubResource, GitHubYmlFile } from '~/types';
import { fetchWithRetry, getErrorMessage, getErrorType } from '~/utils';

export async function getRepositoryDetails(
  args: GetRepositoryDetailsArgs
): Promise<GetRepositoryDetailsResponse> {
  let activeWebhooks: Webhook[] = [];
  let ymlContent: string | undefined;

  try {
    const {
      input: { repository, owner, token },
    } = args;

    const [details, filesInfo, webhooks] = await Promise.all([
      fetchWithRetry<GitHubRepositoryDetails>(
        `${GITHUB_URL}/repos/${owner}/${repository}`,
        getRequestOptions(token)
      ),
      getRepositoryFilesInfo<GitHubResource>(
        `${GITHUB_URL}/repos/${owner}/${repository}/contents`,
        getRequestOptions(token),
        fetchWithRetry
      ),
      fetchWithRetry<Webhook[]>(
        `${GITHUB_URL}/repos/${owner}/${repository}/hooks`,
        getRequestOptions(token)
      ),
    ]);

    let ymlFile: GitHubYmlFile;

    if (filesInfo.firstYmlPath) {
      ymlFile = await fetchWithRetry<GitHubYmlFile>(
        `${GITHUB_URL}/repos/${owner}/${repository}/contents/${filesInfo.firstYmlPath}`,
        getRequestOptions(token)
      );

      ymlContent = Buffer.from(ymlFile.content, ymlFile.encoding).toString('utf-8');
    }

    if (Array.isArray(webhooks)) {
      activeWebhooks = webhooks.filter((hook) => hook.active);
    }

    return {
      success: true,
      data: {
        name: details?.name,
        size: details?.size,
        owner: details?.owner?.login,
        status: details?.visibility,
        amountOfFiles: filesInfo.amount,
        activeWebhooks,
        ymlContent,
      } as RepositoryDetails,
    };
  } catch (error) {
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
