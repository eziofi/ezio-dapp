// ----------------------------------------------------------------------

import { Theme } from '@mui/material/styles/createTheme';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          // @ts-ignore
          boxShadow: theme.customShadows.z20,
        },
      },
    },
  };
}
