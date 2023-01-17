import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }: { openNav: boolean; onCloseNav: () => void }) {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'lg', 'lg');

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
      path: '/dashboard/purchase',
      icon: icon('ic_cart'),
    },
    {
      title: t('nav.account'),
      path: '/dashboard/account',
      icon: icon('ic_user'),
    },
  ];

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        {/*<Logo />*/}
        <img src={logo} width="40" />
      </Box>

      {/*<Box sx={{ mb: 5, mx: 2.5 }}>*/}
      {/*  <Link underline="none">*/}
      {/*    <StyledAccount>*/}
      {/*      <Avatar src={account.photoURL} alt="photoURL" />*/}

      {/*      <Box sx={{ ml: 2 }}>*/}
      {/*        <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>*/}
      {/*          {account.displayName}*/}
      {/*        </Typography>*/}

      {/*        <Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
      {/*          {account.role}*/}
      {/*        </Typography>*/}
      {/*      </Box>*/}
      {/*    </StyledAccount>*/}
      {/*  </Link>*/}
      {/*</Box>*/}

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      {/*<Box sx={{ px: 2.5, pb: 3, mt: 10 }}>*/}
      {/*  <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>*/}
      {/*    <Box*/}
      {/*      component="img"*/}
      {/*      src="/assets/illustrations/illustration_avatar.png"*/}
      {/*      sx={{ width: 100, position: 'absolute', top: -50 }}*/}
      {/*    />*/}

      {/*    <Box sx={{ textAlign: 'center' }}>*/}
      {/*      <Typography gutterBottom variant="h6">*/}
      {/*        Get more?*/}
      {/*      </Typography>*/}

      {/*      <Typography variant="body2" sx={{ color: 'text.secondary' }}>*/}
      {/*        From only $69*/}
      {/*      </Typography>*/}
      {/*    </Box>*/}

      {/*    <Button href="https://material-ui.com/store/items/minimal-dashboard/" target="_blank" variant="contained">*/}
      {/*      Upgrade to Pro*/}
      {/*    </Button>*/}
      {/*  </Stack>*/}
      {/*</Box>*/}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
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
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
