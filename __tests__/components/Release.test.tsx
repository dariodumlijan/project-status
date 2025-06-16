import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { getLatestReleaseResponse } from '../../__mocks__/dummies';
import Release from '../../src/components/containers/Release';

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

describe('section Release', () => {
  it('should render Loading', async () => {
    await handleMockQuery({ isLoading: true });

    render(<Release />);

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

    render(<Release />);

    expect(screen.getByText('400 - Error')).toBeInTheDocument();
  });

  it('should render Markdown', async () => {
    await handleMockQuery({ data: { data: getLatestReleaseResponse } });

    render(<Release />);

    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });
},
);
