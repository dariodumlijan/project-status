import get from 'lodash/get';
import { Octokit } from 'octokit';

const token = get(process.env, 'GITHUB_ACCESS_TOKEN', '');
const owner = get(process.env, 'GITHUB_REPO_OWNER', '');
const repo = get(process.env, 'GITHUB_REPO_NAME', '');
const options = {
  owner,
  repo,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

const octokit = new Octokit({
  auth: token,
});

export const getReleaseNotes = () => {
  const response = octokit.request('GET /repos/{owner}/{repo}/releases/latest', options)
    .then((res) => res)
    .catch((e) => {
      Promise.resolve(e);

      return null;
    });

  return response;
};

export const getStatus = () => {
  const response = octokit.request('GET /repos/{owner}/{repo}/issues', options)
    .then((res) => res)
    .catch((e) => {
      Promise.resolve(e);

      return null;
    });

  return response;
};
