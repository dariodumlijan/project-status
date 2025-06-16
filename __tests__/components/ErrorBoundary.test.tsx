import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../../src/components/containers/ErrorBoundary';

const original = console.error;

beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = original;
});

const ThrowError = () => {
  throw new Error('Test');
};

describe('Error Boundary', () => {
  test('Catches Error and renders Boundary', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );

    expect(screen.getByText('500')).toBeInTheDocument();
  });
});
