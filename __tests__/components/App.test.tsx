import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import App from '../../src/App';

test('should render App', () => {
  const { container } = render(<App />);
  expect(container.querySelector('main')).toBeInTheDocument();
});
