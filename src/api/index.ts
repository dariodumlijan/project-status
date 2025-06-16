import { get, first, isEmpty, orderBy, reduce, reject, replace, values, omit } from 'lodash';
import { Octokit } from 'octokit';
import { getIssueByNumberResponse, getLatestReleaseResponse, getProjectIssuesResponse, getProjectNodeResponse, getSubIssuesByNumberResponse } from '../../__mocks__/dummies';

const tokenRepo = get(import.meta.env, 'VITE_GITHUB_ACCESS_TOKEN_REPO', '');
const tokenProject = get(import.meta.env, 'VITE_GITHUB_ACCESS_TOKEN_PROJECT', '');
const owner = get(import.meta.env, 'VITE_GITHUB_REPO_OWNER', '');
const repo = get(import.meta.env, 'VITE_GITHUB_REPO_NAME', '');
const issueNumber = get(import.meta.env, 'VITE_GITHUB_ISSUE_NUMBER', '');
const projectNumber = Number(get(import.meta.env, 'VITE_GITHUB_PROJECT_NUMBER', ''));
const options = {
  headers: { 'X-GitHub-Api-Version': '2022-11-28' },
  owner,
  repo,
};

export const octokitRepo = new Octokit({
  auth: tokenRepo,
});
export const octokitProject = new Octokit({
  auth: tokenProject,
});

export const getReleaseNotes = (): Promise<{ data: typeof getLatestReleaseResponse }> => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => resolve({ data: getLatestReleaseResponse }))
  }

  return octokitRepo.request(
    "GET /repos/{owner}/{repo}/releases/latest",
    options
  ) as unknown as Promise<{ data: typeof getLatestReleaseResponse }>;
};

export const getStatusSummary = (): Promise<{ data: typeof getIssueByNumberResponse }> => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) => resolve({ data: getIssueByNumberResponse }))
  }

  return octokitRepo.request("GET /repos/{owner}/{repo}/issues/{issue_number}", {
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

  return octokitRepo.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/sub_issues",
    {
      ...options,
      issue_number: issueNumber,
    }
  ) as unknown as Promise<{ data: typeof getSubIssuesByNumberResponse }>;
};

const getProjectNode = () => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) =>
      resolve(getProjectNodeResponse)
    );
  }

  return octokitProject.graphql(
    `query projectNodeId($owner: String!, $projectNumber: Int!) {
      user(login: $owner) {
        projectV2(number: $projectNumber) {
          id
        }
      }
    }`,
    { owner, projectNumber }
  );
}

const getProjectIssues = (projectNodeId: string) => {
  if (import.meta.env.DEV) {
    return new Promise((resolve) =>
      resolve(getProjectIssuesResponse)
    );
  }

  return octokitProject.graphql(
    `query projectIssues($projectNodeId: ID!) {
      node(id: $projectNodeId) {
        ... on ProjectV2 {
          items(first: 100) {
            nodes {
              content {
                ... on Issue {
                  id
                  title
                }
              }
              fieldValues(first: 10) {
                nodes {
                  ... on ProjectV2ItemFieldSingleSelectValue {
                    optionId
                    color
                    name
                    description
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      }
    }`
    , { projectNodeId });
}

export type RoadmapColumn = {
  id: string
  name: string
  color: string
  order: number
  items: {
    id: string
    title: string
  }[]
}

export type RoadmapResponse = {
  data: RoadmapColumn[]
}

export const getRoadmap = async (): Promise<RoadmapResponse> => {
  const nodeResponse = await getProjectNode();
  const projectNodeId = get(nodeResponse, 'user.projectV2.id', '');
  const issuesResponse = await getProjectIssues(projectNodeId);
  const items = get(issuesResponse, 'node.items.nodes', []);

  const columnsById = reduce(items, (res, item) => {
    const column = first(reject(get(item, 'fieldValues.nodes', []), isEmpty))
    const columnId = get(column, 'optionId', 'other')
    const group = res[columnId] || {
      ...omit(column, ['optionId', 'description']),
      id: columnId,
      order: Number(replace(get(column, 'description', '0'), 'index: ', '')),
      items: []
    }

    res[columnId] = {
      ...group,
      items: [...group.items, get(item, 'content', {})]
    }

    return res
  }, {});

  const columns: RoadmapColumn[] = orderBy(values(columnsById), ['order'], ['asc'])

  return { data: columns }
};
