import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
import SvgColor from '../../../components/svg-color';
import { useTranslation } from 'react-i18next';

const logo = require('../../../assets/logo.png');

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: { openNav: boolean; onCloseNav: () => void }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md', 'md');

  const navigate = useNavigate();

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
    {
      title: t('nav.account'),
      path: '/dashboard/account',
      icon: icon('ic_user'),
    },
    {
      title: t('nav.analytics'),
      path: '/dashboard/analytics',
      icon: icon('ic_analytics'),
    },
  ];

  return isDesktop ? (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box sx={{ py: 2, pr: 2, display: 'inline-flex' }}>
        <img src={logo} width="40" />
      </Box>
      {navConfig.map(navItem => (
        <Button key={navItem.path} sx={{ color: 'text.primary', fontSize: 16 }} onClick={() => navigate(navItem.path)}>
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
        <Scrollbar
          sx={{
            height: 1,
            '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
          }}
        >
          <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
            <img src={logo} width="40" />
          </Box>
          <NavSection data={navConfig} />
        </Scrollbar>
      </Drawer>
    </Box>
  );
}
