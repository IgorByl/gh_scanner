import { GITHUB_URL, Owner } from '~/constants';
import { RepositoryOwner } from '~/handlers/scanner/types';

export const getRepositoryURL = (owner: string, ownerType: RepositoryOwner): string => {
  let url: string;

  if (ownerType === Owner.User) {
    url = `${GITHUB_URL}/users/${owner}/repos`;
  } else if (ownerType === Owner.Organizarion) {
    url = `${GITHUB_URL}/orgs/${owner}/repos`;
  } else {
    throw Error('Repository url is not defined.');
  }

  return url;
};
