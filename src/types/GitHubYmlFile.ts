import { GitHubResource } from './GitHubResource';

export interface GitHubYmlFile extends GitHubResource {
  content: string;
  encoding: 'base64';
}
