// ----------------------------------------------------------------------

import { Theme } from '@mui/material';

export default function Table(theme: Theme) {
  return {
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: theme.palette.text.secondary,
          // @ts-ignore
          backgroundColor: theme.palette.background.neutral,
        },
      },
    },
  };
}
