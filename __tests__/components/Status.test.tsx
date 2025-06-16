import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getIssueByNumberResponse } from '../../__mocks__/dummies';
import Status from '../../src/components/containers/Status';

const defaultOptions = {
  data: null,
  error: null,
  isError: false,
  isLoading: false,
};

const handleMockQuery = async (options) => {
  const reactQuery = await import('@tanstack/react-query');
  reactQuery.useQuery = vi.fn().mockReturnValue({ ...defaultOptions, ...options });
};

describe('section Status', () => {
  it('should render Loading', async () => {
    await handleMockQuery({ isLoading: true });

    render(<Status />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render Error', async () => {
    await handleMockQuery({
      isError: true,
      error: {
        status: '400',
        message: 'Error',
      },
    });

    render(<Status />);

    expect(screen.getByText('400 - Error')).toBeInTheDocument();
  });

  it('should render Markdown', async () => {
    await handleMockQuery({ data: { data: getIssueByNumberResponse } });

    render(<Status />);

    expect(screen.getByText('Current status')).toBeInTheDocument();
  });
});
