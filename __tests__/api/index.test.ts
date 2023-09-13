import { waitFor } from '@testing-library/react';
import { getIssueByNumberResponse, getLatestReleaseResponse } from '../../__mocks__/dummies';
import { getReleaseNotes, getStatus, octokit } from '../../src/api';

describe('API', () => {
  test('getReleaseNotes', () => {
    vi.spyOn(octokit, 'request').mockResolvedValue(getLatestReleaseResponse as any);

    waitFor(async () => {
      const response = await getReleaseNotes().then((res) => res);
      expect(response).toEqual(getLatestReleaseResponse);
    });
  });

  test('getStatus', () => {
    vi.spyOn(octokit, 'request').mockResolvedValue(getIssueByNumberResponse as any);

    waitFor(async () => {
      const response = await getStatus();
      expect(response).toEqual(getIssueByNumberResponse);
    });
  });
});
