import { RepositoryOwner } from '~/handlers/scanner/types';

export const getRepositoryURL = (owner: string, type: RepositoryOwner): string => {
  let url: string;

  if (type === 'USER') {
    url = `https://api.github.com/users/${owner}/repos`;
  } else if (type === 'ORGANIZATION') {
    url = `https://api.github.com/orgs/${owner}/repos`;
  } else {
    throw Error('Repository url is not defined.');
  }

  return url;
};
