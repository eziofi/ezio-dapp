import { Avatar, Drawer, IconButton, List, ListItem, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import metamaskBtn from '../../../assets/home/metamask@3x.png';
import useResponsive from '../../../hooks/useResponsive';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import useWallet from '../../../views/hooks/useWallet';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import BalanceList from '../../../views/purchase/components/BalanceList';
import { TOKEN_TYPE } from '../../../views/wallet/helpers/constant';
import TokenLIstItem from './TokenLIstItem';
import { formatString } from '../../../views/wallet/helpers/utilities';
import { InlineSkeleton } from '../../../views/components/Skeleton';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { ColorModeContext } from '../../../theme';
import { useBalance } from '../../../hooks/useBalance';
import { useTranslation } from 'react-i18next';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setCopyFlag: (copyFlag: boolean) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function DrawerSetting({ open, setOpen, setCopyFlag }: IProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { connectState, connect, disconnect, account } = useWallet();

  const isDesktop = useResponsive('up', 'sm', 'sm');
  const addressToShow = account.substring(0, 5) + '...' + account.substring(account.length - 5, account.length);

  const [hiddenCopy, setHiddenCopy] = useState(false);

  const copyText = async () => {
    await navigator.clipboard.writeText(account);
    setCopyFlag(true);
  };

  const logout = () => {
    disconnect();
    setOpen(false);
  };

  const USDEBALANCE = useBalance(TOKEN_TYPE.USDE).balance;
  const E2LPBALANCE = useBalance(TOKEN_TYPE.E2LP).balance;

  const tokens = [
    {
      value: TOKEN_TYPE.E2LP,
      iconParentStyle: {
        background: 'rgba(239, 89, 114, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
      },
      iconName: 'icon-B',
      iconStyle: { width: 30, height: 30, fill: 'white' },
      balance: E2LPBALANCE,
    },
    {
      value: TOKEN_TYPE.USDE,
      iconParentStyle: {
        background: 'rgba(95, 69, 186, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: '50%',
      },
      iconName: 'icon-A',
      iconStyle: { width: 30, height: 30, fill: 'white' },
      balance: USDEBALANCE,
    },
  ];

  const [totalValue, setTotalValue] = useState<number | undefined>(0);

  useMemo(() => {
    if (USDEBALANCE && E2LPBALANCE) {
      const sum = formatString(String(Number(USDEBALANCE) + Number(E2LPBALANCE)), 6).toString();
      setTotalValue(+sum);
    }
  }, [USDEBALANCE, E2LPBALANCE]);

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const [isStting, setIsSetting] = useState(false);

  const lang = localStorage.getItem('lang');

  const langs = [
    {
      title: 'English',
      value: 'en',
    },
    {
      title: '简体中文',
      value: 'zh',
    },
  ];

  function changeLang(lang: string) {
    localStorage.setItem('lang', lang);
    window.location.reload();
  }

  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const DrawerRootStyle = {
    width: isDesktop ? '320px' : '100vw',
    // padding: '14px 20px',
    height: isDesktop ? 'calc(100% - 16px)' : '90%',
    fontFamily: 'Inter custom,sans-serif',
    boxShadow: 'none',
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(152, 161, 192, 0.24)' : 'rgb(210, 217, 238)'}`,
    background: theme.palette.background.default,
  };

  const copyBtnStyle = {
    width: 14,
    height: 14,
    ml: theme.spacing(1),
    ':hover': {
      cursor: 'pointer',
    },
  };

  const accountStyle = {
    fontWeight: 500,
    ':hover': {
      opacity: '0.6',
      cursor: 'pointer',
    },
  };

  const iconBtnStyle = {
    width: 32,
    height: 32,
    // @ts-ignore
    background: `rgb(${theme.palette.drawer.textBgColor})`,
    borderRadius: '12px',
  };

  const settingIconStyle = {
    width: 16,
    height: 16,
    color: theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black,
  };

  const listItemStyle = {
    mb: theme.spacing(3),
    height: '42px',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '14px 20px',
  };

  const langItemStyle = {
    fontSize: 14,
    mb: theme.spacing(1),
    padding: '14px 20px',
    ':hover': { cursor: 'pointer', opacity: '0.7' },
  };

  return (
    <Drawer
      anchor={isDesktop ? 'right' : 'bottom'}
      open={open}
      onClose={() => setOpen(false)}
      sx={
        isDesktop
          ? {
              '.MuiPaper-root': {
                top: '8px',
                right: '8px',
                ...DrawerRootStyle,
                borderRadius: '12px',
              },
            }
          : {
              '.MuiPaper-root': {
                bottom: '0',
                ...DrawerRootStyle,
                borderTopLeftRadius: '12px',
                borderTopRightRadius: '12px',
              },
            }
      }
    >
      {!isStting ? (
        <List>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src={metamaskBtn} sx={{ width: 40, height: 40 }} />
              <Box
                sx={accountStyle}
                onMouseOver={() => {
                  setHiddenCopy(true);
                }}
                onMouseOut={() => {
                  setHiddenCopy(false);
                }}
                onClick={copyText}
              >
                <span style={{ marginLeft: theme.spacing(1) }}>{isDesktop ? addressToShow : ''}</span>
                {hiddenCopy && <ContentCopyRoundedIcon sx={copyBtnStyle} />}
              </Box>
            </Box>

            <div>
              <IconButton sx={iconBtnStyle} onClick={() => setIsSetting(true)}>
                <SettingsOutlinedIcon sx={settingIconStyle} />
              </IconButton>
              <IconButton sx={{ ...iconBtnStyle, ml: theme.spacing(1) }} onClick={logout}>
                <LogoutOutlinedIcon sx={settingIconStyle} />
              </IconButton>
            </div>
          </Box>

          {/* token总价值 */}
          <Box sx={{ fontSize: '36px', fontWeight: '500', mt: theme.spacing(1), padding: '0px 20px' }}>
            {totalValue ? '$' + totalValue : <InlineSkeleton />}
          </Box>

          {/* tokens */}
          <Box sx={{ margin: '10px 0', padding: '0px 20px' }}>{t('drawerSeting.tokens')}</Box>
          <TabPanel value={0} index={0}>
            {tokens.map((item, index: number) => {
              return <TokenLIstItem item={item} key={index} />;
            })}
          </TabPanel>
        </List>
      ) : (
        <List>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: '20px',
              padding: '14px 20px',
            }}
          >
            <ArrowBackOutlinedIcon
              sx={{
                ':hover': {
                  cursor: 'pointer',
                  opacity: '0.7',
                },
              }}
              onClick={() => {
                setIsSetting(false);
              }}
            />
            <span style={{ margin: '0 auto', fontWeight: '500' }}></span>
          </Box>

          <Typography sx={{ color: 'rgb(119, 128, 160)', mb: theme.spacing(3), padding: '0px 20px' }}>
            {t('drawerSeting.preferences')}
          </Typography>

          <ListItem sx={listItemStyle}>
            <Typography>{t('drawerSeting.setting')}</Typography>
            <Box
              style={{
                borderRadius: '16px',
                gap: '4px',
                padding: '4px',
                outline: 'rgb(210, 217, 238) solid 1px',
                outlineOffset: '-1px',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {['light', 'dark'].map(item => {
                return (
                  <IconButton
                    key={item}
                    sx={{
                      padding: '6px',
                      borderRadius: '12px',
                      fontSize: 16,
                      // @ts-ignore
                      background: mode === item ? `rgba(${theme.palette.drawer.modeBgColor},0.12)` : '',
                    }}
                    onClick={() => toggleColorMode()}
                  >
                    {item === 'light' ? (
                      <LightModeOutlinedIcon sx={{ color: mode === 'light' ? `rgb(251, 17, 142)` : '' }} />
                    ) : item === 'dark' ? (
                      <DarkModeOutlinedIcon sx={{ color: mode === 'dark' ? `rgb(76, 130, 251)` : '' }} />
                    ) : (
                      <></>
                    )}
                  </IconButton>
                );
              })}
            </Box>
          </ListItem>
          <ListItem sx={listItemStyle}>
            <Typography sx={{ fontWeight: '500', color: theme.palette.text.secondary }}>{t('home.lang')}</Typography>
          </ListItem>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {langs.map((item: { title: string; value: string }, index: number) => {
              return (
                <ListItem
                  key={index}
                  sx={{ ...langItemStyle, justifyContent: 'space-between', alignItems: 'center' }}
                  onClick={() => changeLang(item.value)}
                >
                  {item.title}
                  {item.value === lang && <CheckOutlinedIcon sx={{ color: 'rgb(76, 130, 251)' }} />}
                </ListItem>
              );
            })}
          </Box>
        </List>
      )}
    </Drawer>
  );
}
