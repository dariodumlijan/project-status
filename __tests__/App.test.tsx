import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { TestQueryClient } from '../__mocks__/dummies/TestQueryClient';
import App from '../src/App';

test('Renders App', () => {
  const { container } = render(
    <TestQueryClient>
      <App />
    </TestQueryClient>,
  );
  expect(container.querySelector('main')).toBeInTheDocument();
});
