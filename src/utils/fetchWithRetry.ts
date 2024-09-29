import { getErrorMessageByCode } from './errorCodeType';

/**
 * Makes a fetch request to the specified URL with automatic retries for server-side errors (5xx).
 *
 * @param {string} url - The URL to make the request to.
 * @param {object} [options={}] - (Optional) The options to pass to the fetch request (e.g., headers, method).
 * @param {number} [retries=2] - (Optional) The number of times to retry the request in case of server errors (default is 2).
 * @param {number} [backoff=1000] - (Optional) The initial delay (in ms) between retries, which doubles with each retry (default is 1000 ms).
 * @returns {Promise<T>} - A promise that resolves to the response data in JSON format if the request is successful.
 * @throws {Error} - Throws an error if the request fails after the retries are exhausted and non-valid permissions.
 */
export async function fetchWithRetry<T>(
  url: string,
  options = {},
  retries = 2,
  backoff = 1000
): Promise<T> {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(getErrorMessageByCode('AUTHORIZATION_FAILED'));
      } else if (response.status === 403) {
        throw new Error(getErrorMessageByCode('FORBIDDEN'));
      } else if (response.status === 404) {
        throw new Error(getErrorMessageByCode('NOT_FOUND'));
      } else if (response.status >= 400 && response.status < 500) {
        throw new Error(`Client error: ${response.status} - ${response.statusText}`);
      } else if (response.status >= 500 && retries > 0) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
    }

    return (await response.json()) as T;
  } catch (error) {
    const message = (error as Record<string, unknown>)?.message as string;

    if (retries > 0 && message.startsWith('Server error')) {
      console.log(`Retrying... ${url} (${retries} retries left)`);
      await new Promise((resolve) => {
        setTimeout(resolve, backoff);
      });

      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }

    console.error('Fetch failed:', message);
    throw error;
  }
}
