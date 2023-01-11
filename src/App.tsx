import React, { useMemo } from 'react';
// routes
import Router from './routes';
// theme
// import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

import './App.less';
import Layout from './views/layout/Layout';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import WalletProvider from './views/context/WalletProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import customShadows from './theme/customShadows';
import ComponentsOverrides from './theme/overrides';
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
  const themeOptions = useMemo(
    () => ({
      palette: {
        mode: 'dark',
        primary: {
          main: 'rgba(42, 130, 228, 1)',
        },
        info: {
          main: '#43cf7c',
        },
      },
      components: {
        MuiBottomNavigation: {
          styleOverrides: {
            root: {
              backgroundColor: 'rgba(25, 26, 30, 1)',
            },
          },
        },
        MuiBottomNavigationAction: {
          styleOverrides: {
            label: { fontSize: 10 },
          },
        },
      },
      customShadows: customShadows(),
    }),
    [],
  );
  // @ts-ignore
  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <WalletProvider>
          <ThemeProvider theme={theme}>
            <ScrollToTop />
            <StyledChart />
            <Router />
          </ThemeProvider>
        </WalletProvider>
      </QueryClientProvider>
    </div>
  );
}
