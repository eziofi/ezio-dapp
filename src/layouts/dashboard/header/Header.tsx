import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, CircularProgress, Chip } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
import LanguagePopover from './LanguagePopover';
import Iconify from '../../../components/iconify';
import AddressPopover from './AddressPopover';
import ThemeSwitcher from './ThemeSwitcher';

import { useLocation } from 'react-router-dom';
import NetWorkPopover from './NetWorkPopover';
import Nav from '../nav/Nav';
import React from 'react';
import useResponsive from '../../../hooks/useResponsive';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// @ts-ignore
const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  // [theme.breakpoints.up('lg')]: {
  //   width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  // },
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
  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'md', 'md');

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { md: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {isDesktop && <Nav openNav={false} onCloseNav={() => {}} />}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={1}>
          {loadingOpen && pathname !== '/dashboard/swap' && (
            <Chip
              sx={{
                color: theme => (theme.palette.mode === 'light' ? theme.palette.grey[600] : theme.palette.grey[400]),
              }}
              icon={<CircularProgress size={14} />}
              label={loadingText}
              variant="outlined"
            />
          )}
          {/* <ThemeSwitcher /> */}
          {/* <LanguagePopover /> */}
          {/*<NotificationsPopover />*/}
          {/*<AccountPopover />*/}
          <NetWorkPopover />
          <AddressPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
