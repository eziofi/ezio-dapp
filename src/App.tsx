import React, { useMemo } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
// import ScrollToTop from './components/scroll-to-top';

// import './App.less';
import WalletProvider from './views/context/WalletProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import './views/default.less';
import UIProvider from './views/context/UIProvider';

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
  console.log(1123)
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <UIProvider>
            <WalletProvider>
              <Router />
            </WalletProvider>
          </UIProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}
