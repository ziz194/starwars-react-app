import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import type { ReactNode } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const createTestQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
};

interface TestProvidersProps {
  component: ReactNode;
  router?: { route: string; path: string };
}

export const TestProviders = ({
  component,
  router = { route: '/', path: '/' },
}: TestProvidersProps) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <MemoryRouter initialEntries={[router?.route]}>
          <Routes>
            <Route path={router?.path} element={component} />
          </Routes>
        </MemoryRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
