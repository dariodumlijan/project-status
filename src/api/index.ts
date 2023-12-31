import get from 'lodash/get';
import { Octokit } from 'octokit';

const token = get(import.meta.env, 'VITE_GITHUB_ACCESS_TOKEN', '');
const owner = get(import.meta.env, 'VITE_GITHUB_REPO_OWNER', '');
const repo = get(import.meta.env, 'VITE_GITHUB_REPO_NAME', '');
const issueNumber = get(import.meta.env, 'VITE_GITHUB_STATUS_ISSUE_NUMBER', '');
const options = {
  headers: { 'X-GitHub-Api-Version': '2022-11-28' },
  owner,
  repo,
};

export const octokit = new Octokit({
  auth: token,
});

export const getReleaseNotes = () => octokit.request('GET /repos/{owner}/{repo}/releases/latest', options);

export const getStatus = () => octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
  ...options,
  issue_number: issueNumber,
});
