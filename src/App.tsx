import React, { useMemo } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// import './App.less';
import WalletProvider from './views/context/WalletProvider';
import { QueryClient, QueryClientProvider } from 'react-query';

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <ThemeProvider>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </WalletProvider>
      </QueryClientProvider>
    </div>
  );
}
