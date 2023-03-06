import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, CircularProgress } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
// import Iconify from '../../../components/iconify';
//
import Searchbar from './Searchbar';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import Iconify from '../../../components/iconify';
import AddressPopover from './AddressPopover';
import ThemeSwitcher from './ThemeSwitcher';
import { useContext } from 'react';
import { UIContext } from '../DashboardLayout';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// @ts-ignore
const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({
  onOpenNav,
  loadingOpen,
  loadingText,
}: {
  onOpenNav: () => void;
  loadingOpen: boolean;
  loadingText: string;
}) {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        {/*<Searchbar />*/}
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          {loadingOpen && (
            <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
              <Box sx={{ mr: 1, color: 'text.primary' }}>{loadingText}</Box>
              <CircularProgress size={24} />
            </Box>
          )}
          <ThemeSwitcher />
          <LanguagePopover />
          {/*<NotificationsPopover />*/}
          {/*<AccountPopover />*/}
          <AddressPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
