import PropTypes from 'prop-types';
import { createContext, Dispatch, ReactNode, SetStateAction, useMemo, useState } from 'react';
// @mui
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import shadows from './shadows';
import typography from './typography';
import GlobalStyles from './globalStyles';
import customShadows from './customShadows';
import componentsOverride from './overrides';
import { ThemeOptions } from '@mui/material/styles/createTheme';
import paletteDark from './paletteDark';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

type colorModeType = 'light' | 'dark';
interface IColorMode {
  mode: colorModeType;
  toggleColorMode: () => void;
}
export const ColorModeContext = createContext<IColorMode>({ mode: 'light', toggleColorMode: () => {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const colorModeContext = { mode, toggleColorMode };

  const themeOptions = useMemo(
    () => ({
      palette: mode === 'light' ? palette : paletteDark,
      shape: { borderRadius: 6 },
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
    }),
    [mode],
  );
  // @ts-ignore
  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorModeContext}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          {children}
        </MUIThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
}
