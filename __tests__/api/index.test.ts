import { waitFor } from '@testing-library/react';
import { getIssueByNumberResponse, getLatestReleaseResponse } from '../../__mocks__/dummies';
import { getReleaseNotes, getStatusSummary, octokitRepo } from '../../src/api';

describe('API', () => {
  test('getReleaseNotes', () => {
    vi.spyOn(octokitRepo, 'request').mockResolvedValue(getLatestReleaseResponse as never);

    waitFor(async () => {
      const response = await getReleaseNotes().then((res) => res);
      expect(response).toEqual(getLatestReleaseResponse);
    });
  });

  test('getStatusSummary', () => {
    vi.spyOn(octokitRepo, 'request').mockResolvedValue(getIssueByNumberResponse as never);

    waitFor(async () => {
      const response = await getStatusSummary();
      expect(response).toEqual(getIssueByNumberResponse);
    });
  });
});
