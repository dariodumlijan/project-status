/// <reference types="vitest/globals" />

beforeEach(() => {
  Element.prototype.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
  document.execCommand = vi.fn();
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn().mockReturnValue({
      data: null,
      error: null,
      isError: false,
      isLoading: false,
    }),
  }));
});

afterEach(() => {
  vi.clearAllMocks();
})
