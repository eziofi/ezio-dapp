// import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
// import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';

import NavSection from '../../../components/nav-section';
import SvgColor from '../../../components/svg-color';
import { useTranslation } from 'react-i18next';

const logo = require('../../../assets/logo.png');

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: { openNav: boolean; onCloseNav: () => void }) {
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md', 'md');

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isCurrent = (path: string) => path === pathname;

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const navConfig = [
    {
      title: t('nav.home'),
      path: '/dashboard/homePage',
      icon: icon('ic_dashboard'),
    },
    {
      title: t('nav.swap'),
      path: '/dashboard/swap',
      icon: icon('ic_cart'),
    },
    // {
    //   title: t('nav.account'),
    //   path: '/dashboard/account',
    //   icon: icon('ic_user'),
    // },
    {
      title: t('nav.analytics'),
      path: '/dashboard/analytics',
      icon: icon('ic_analytics'),
    },
  ];

  return isDesktop ? (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box sx={{ py: 2, pr: 2, display: 'inline-flex' }}>
        <img src={logo} width="40" />
      </Box>
      {navConfig.map(navItem => (
        <Button
          key={navItem.path}
          sx={{
            color: theme =>
              theme.palette.mode === 'light'
                ? isCurrent(navItem.path)
                  ? theme.palette.primary.main
                  : theme.palette.grey[600]
                : isCurrent(navItem.path)
                ? theme.palette.primary.main
                : theme.palette.grey[500],
            fontSize: 16,
          }}
          onClick={() => navigate(navItem.path)}
        >
          {navItem.title}
        </Button>
      ))}
    </Stack>
  ) : (
    <Box component="nav">
      <Drawer
        open={openNav}
        onClose={onCloseNav}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: { width: NAV_WIDTH },
        }}
      >
        <>
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <img src={logo} width="40" />
          </Box>
          <NavSection data={navConfig} />
        </>
      </Drawer>
    </Box>
  );
}
