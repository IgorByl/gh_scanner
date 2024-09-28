import { GitHubResource, RequestOptions } from '~/types';

/**
 * Recursively fetches the contents of a GitHub repository directory and returns an amount of files.
 * Also tracks the first YML(YAML) file encountered.
 *
 * @param url - Repository URL.
 * @param options - Fetch function request options.
 * @param fetchWithRetry - A function that makes the API call with retry logic.
 * @returns A promise containing an object with the list length of all files, and the first YAML file path.
 */
export async function getRepositoryFilesInfo<T extends GitHubResource>(
  url: string,
  options: RequestOptions,
  fetch: (url: string, options: RequestOptions) => Promise<T[]>
): Promise<{ amount: number; firstYmlPath: string | null }> {
  let amount = 0;
  let firstYmlPath: string | null = null;

  async function processDirectory(dirUrl: string): Promise<void> {
    const contents: T[] = await fetch(dirUrl, options);

    const directories: T[] = [];

    if (Array.isArray(contents)) {
      for (const item of contents) {
        const isFile = item.type === 'file';

        if (isFile) {
          amount += 1;
        }

        if (
          (firstYmlPath === null && isFile && item.name.endsWith('.yml')) ||
          item.name.endsWith('.yaml')
        ) {
          firstYmlPath = item.path;
        }

        if (!isFile) {
          directories.push(item);
        }
      }

      await Promise.all(directories.map((dir) => processDirectory(`${url}/${dir.path}`)));
    }
  }

  await processDirectory(url);

  return { amount, firstYmlPath };
}
