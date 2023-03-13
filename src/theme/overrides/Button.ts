import { alpha } from '@mui/material/styles';
import { Theme } from '@mui/material';

// ----------------------------------------------------------------------

export default function Button(theme: Theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
        }, // type === 'containerd'

        contained: {
          color: 'white',
          '&:hover': {
            // @ts-ignore
            background: theme.palette.action.btnHover,
          },
        },
        containedPrimary: {
          // @ts-ignore
          // boxShadow: theme.customShadows.primary,
        },
        containedSecondary: {
          // @ts-ignore
          // boxShadow: theme.customShadows.secondary,
        },
        outlinedInherit: {
          border: `1px solid ${alpha(theme.palette.grey[500], 0.32)}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        },
      },
    },
  };
}
