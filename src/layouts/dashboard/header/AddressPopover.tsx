import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Popover,
  Snackbar,
  Typography,
} from '@mui/material';
import useWallet from '../../../views/hooks/useWallet';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
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

export default function AddressPopover() {
  const { connectState, connect, disconnect, account, networkId } = useWallet();

  const [open, setOpen] = useState<(EventTarget & HTMLButtonElement) | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const [copyFlag, setCopyFlag] = useState<boolean>(false);
  const { t } = useTranslation();

  const isDesktop = useResponsive('up', 'md', 'md');

  // const { balance } = useBalance(TOKEN_TYPE.USDT);

  const addressToShow = account.substring(0, 5) + '...' + account.substring(account.length - 5, account.length);
  const addressToShowInPop = account.substring(0, 12) + '...' + account.substring(account.length - 12, account.length);

  // useEffect(() => {
  //   if (!hasOpenDialog && networkId && networkId !== 'arbitrum') {
  //     setDialogOpen(true);
  //     setHasOpenDialog(true);
  //   }
  // });

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

  const copyText = () => {
    var copyDOM = document.getElementById('account'); //需要复制文字的节点
    var range = document.createRange(); //创建一个range
    window.getSelection()?.removeAllRanges(); //清楚页面中已有的selection
    range.selectNode(copyDOM as any); // 选中需要复制的节点
    window.getSelection()?.addRange(range); // 执行选中元素
    var successful = document.execCommand('copy');
    setCopyFlag(true);
    // message.success('复制成功!');
  };
  const copyClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setCopyFlag(false);
  };

  return (
    <>
      {connectState === 'connected' ? (
        <Button
          variant="outlined"
          onClick={event => {
            setOpen(event.currentTarget);
          }}
          endIcon={<KeyboardArrowDownOutlinedIcon />}
        >
          <Avatar src={metamaskBtn} sx={{ width: 24, height: 24, marginRight: isDesktop ? 1 : 0 }} />
          {isDesktop ? addressToShow : ''}
        </Button>
      ) : connectState === 'connecting' ? (
        <Button variant="outlined">{t('home.connecting')}</Button>
      ) : (
        <Button variant="outlined" onClick={connect}>
          {t('home.login')}
        </Button>
      )}
      <Popover
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

        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

        <Box sx={{ my: 1.5, px: 2.5 }}>
          {/*{balance ? <TextDiv>{formatString(balance).toString() + ' USDT'}</TextDiv> : <InlineSkeleton width={70} />}*/}
          <NetworkWrapper>
            <BaseIconFont name="icon-arbitrum" style={{ width: 32, height: 32 }} />
            <TextDiv>Arbitrum</TextDiv>
            {/*<div>您连接的网络是{networkName}</div>*/}
          </NetworkWrapper>
          <Button
            sx={{
              width: '100%',
              // background: 'linear-gradient(180deg, rgba(108, 75, 246, 1) 0%, rgba(113, 79, 251, 1) 100%)',
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
      </Popover>
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
