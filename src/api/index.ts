import get from 'lodash/get';
import { Octokit } from 'octokit';
import { getIssueByNumberResponse, getLatestReleaseResponse, getRoadmapResponse, getSubIssuesByNumberResponse } from '../../__mocks__/dummies';

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

export const getReleaseNotes = (): Promise<{ data: typeof getLatestReleaseResponse }> => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => resolve({ data: getLatestReleaseResponse }))
  }

  return octokit.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    options
  ) as unknown as Promise<{ data: typeof getLatestReleaseResponse }>;
};

export const getStatusSummary = (): Promise<{ data: typeof getIssueByNumberResponse }> => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => resolve({ data: getIssueByNumberResponse }))
  }

  return octokit.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
    ...options,
    issue_number: issueNumber,
  }) as unknown as Promise<{ data: typeof getIssueByNumberResponse }>;
};

export const getStatusServices = (): Promise<{ data: typeof getSubIssuesByNumberResponse }> => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) =>
      resolve({ data: getSubIssuesByNumberResponse })
    );
  }

  return octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues",
    {
      ...options,
      issue_number: issueNumber,
    }
  ) as unknown as Promise<{ data: typeof getSubIssuesByNumberResponse }>;
};

export const getRoadmap = async (): Promise<{ data: unknown }> => {
  if (import.meta.env.DEV) {
    return { data: getRoadmapResponse }
  }

  const response = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    ...options,
    state: 'all',
    per_page: 100,
  });

  return response
};
