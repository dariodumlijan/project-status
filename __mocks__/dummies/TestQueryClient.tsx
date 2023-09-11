import { QueryClient, QueryClientProvider } from 'react-query';

export function TestQueryClient({ children }: any) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
