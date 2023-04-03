import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  Popover,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';
import useWallet from '../../../views/hooks/useWallet';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { styled } from '@mui/material/styles';
import metamaskBtn from '../../../assets/home/metamask@3x.png';
import { useBalance } from '../../../hooks/useBalance';
import { TOKEN_TYPE } from '../../../views/wallet/helpers/constant';
import { formatDecimal, formatString } from '../../../views/wallet/helpers/utilities';
import useResponsive from '../../../hooks/useResponsive';
import { InlineSkeleton } from '../../../views/components/Skeleton';
import BaseIconFont from '../../../views/components/BaseIconFont';
import { ColorModeContext } from '../../../theme';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { ImageBox } from '../../../views/homePage/mainStyle';
import icon_en from '../../../assets/header/ic_flag_en.svg';
import icon_zh from '../../../assets/header/ic_flag_cn.svg';
import DrawerSetting from './DrawerSetting';

export default function AddressPopover() {
  const { connectState, connect, disconnect, account } = useWallet();

  const [open, setOpen] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const [copyFlag, setCopyFlag] = useState<boolean>(false);
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md', 'md');

  // const { balance } = useBalance(TOKEN_TYPE.USDT);

  const addressToShow = account.substring(0, 5) + '...' + account.substring(account.length - 5, account.length);
  const addressToShowInPop = account.substring(0, 12) + '...' + account.substring(account.length - 12, account.length);

  const logout = () => {
    disconnect();
    handleClose();
  };

  const handleClose = () => {
    setOpen(null);
  };

  const NetworkWrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '37px',
    marginTop: '37px',
  });

  const TextDiv = styled('span')({
    marginLeft: 6,
    fontSize: '32px',
  });

  const copyText = async () => {
    await navigator.clipboard.writeText(account);
    setCopyFlag(true);
  };

  const copyClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setCopyFlag(false);
  };

  const theme = useTheme();

  const languageAndThemeStyle = {
    width: '100%',
    borderRadius: '12px',
    // color: 'rgb(119, 128, 160)',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 8px',
    fontWeight: 400,
  };

  const lang = localStorage.getItem('lang');

  const { mode, toggleColorMode } = useContext(ColorModeContext);

  type langType = 'en' | 'zh';

  const LANGS = {
    en: {
      value: 'en',
      label: 'English',
      icon: icon_en,
    },
    zh: {
      value: 'zh',
      label: '简体中文',
      icon: icon_zh,
    },
  };

  function changeLang() {
    localStorage.setItem('lang', lang === 'en' ? 'zh' : 'en');
    window.location.reload();
  }

  const [openDrawer, setOpenDrawer] = useState(false);
  const USDEBALANCE = useBalance(TOKEN_TYPE.USDE).balance;
  const E2LPBALANCE = useBalance(TOKEN_TYPE.E2LP).balance;

  return (
    <>
      {connectState === 'connected' ? (
        <Button
          onClick={event => {
            // setOpen(event.currentTarget);
            setOpenDrawer(true);
          }}
          endIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          {/* <Avatar src={metamaskBtn} sx={{ width: 24, height: 24 }} /> */}
          <Avatar src={metamaskBtn} sx={{ width: 24, height: 24, marginRight: isDesktop ? 1 : 0 }} />
          {isDesktop ? addressToShow : ''}
        </Button>
      ) : connectState === 'connecting' ? (
        <Button>{t('home.connecting')}</Button>
      ) : (
        <Button onClick={connect}>{t('home.login')}</Button>
      )}
      {/* <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 400,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ display: 'flex', width: '60%' }}>
            <Avatar alt="Remy Sharp" src={metamaskBtn} sx={{ width: 24, height: 24, marginRight: 1 }} />
            <Typography variant="subtitle2">{addressToShowInPop}</Typography>
          </span>
          <IconButton color="primary" sx={{ marginLeft: '20px', color: 'rgb(108, 75, 246)' }} onClick={copyText}>
            <ContentCopyRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Divider />
          <Box sx={{ margin: '20px 0' }}>
            <Button sx={{ ...languageAndThemeStyle }} onClick={changeLang}>
              <span>语言</span>
              <span style={{ display: 'flex' }}>{lang}</span>
            </Button>

            <Button sx={{ ...languageAndThemeStyle }} onClick={toggleColorMode}>
              <span>{mode} Theme</span>
              <span>{mode === 'light' ? <WbSunnyIcon /> : <NightlightIcon />}</span>
            </Button>
          </Box>
          <Button
            sx={{
              width: '100%',
              borderRadius: '36px',
              marginBottom: '37px',
            }}
            onClick={logout}
            variant="contained"
          >
            {t('home.logout')}
          </Button>
        </Box>
        <Snackbar
          open={copyFlag}
          autoHideDuration={1000}
          onClose={copyClose}
          message={t('home.copyText')}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        />
      </Popover> */}
      <DrawerSetting open={openDrawer} setOpen={setOpenDrawer} />
      <Dialog open={dialogOpen} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{t('common.warning')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('common.errorNetworkTip')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{t('common.ok')}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
