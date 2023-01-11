import styles from './homePage.module.less';
import netBtn from '../../assets/home/net@2x.png';
import walletBtn from '../../assets/home/wallet@2x.png';
import langBtn from '../../assets/home/lang@2x.png';
import MarketChart from './components/MarketChart';
import PriceTable from './components/PriceTable';
import { useContext, useEffect, useState } from 'react';
import NetDrawer from './components/NetDrawer';
import LangDrawer from './components/LangDrawer';
import { useTranslation } from 'react-i18next';
import useWallet from '../hooks/useWallet';
import { useQuery } from 'react-query';
import { TOKEN_TYPE } from '../wallet/helpers/constant';
import metamaskBtn from '../../assets/home/metamask@3x.png';
import { FormControlLabel, Link, Stack, Switch, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import {
  ezatTotalSupply,
  ezbtTotalSupply,
  treasuryInterestRate,
  treasuryTotalNetWorth,
} from '../wallet/helpers/contract_call';
import { formatNetWorth, toNum } from '../wallet/helpers/utilities';
import NetWorthChart from './components/NetWorthChart';
import TotalSupplyChart from './components/TotalSupplyChart';

export default function HomePage() {
  const [netDrawerOpened, setNetDrawerOpened] = useState(false);
  const [netChecked, setNetChecked] = useState('mainnet');
  const [langDrawerOpened, setLangDrawerOpened] = useState(false);
  const { t } = useTranslation();
  const { connectState, connect, disconnect, account, ethersProvider } = useWallet();

  return (
    <div className={styles.HomePage}>
      <div className={styles.titleContainer}>
        {connectState === 'connected' ? (
          <div style={{ fontSize: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={metamaskBtn} alt="" width="30" height="30" />
              <div style={{ marginLeft: '7px' }}>
                <div>{t('home.connectedAccount')}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ marginRight: '7px' }}>
                    {account.substring(0, 7) + '...' + account.substring(account.length - 7, account.length)}
                  </div>
                  <Link onClick={disconnect}>{t('home.logout')}</Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }} onClick={connect}>
            <div className={`${styles.imgBox} ${styles.wallet}`}>
              <img src={walletBtn} alt="" width="18" />
            </div>
            <Link style={{ fontSize: '12px', marginLeft: '7px' }}>
              {connectState === 'connecting' ? t('home.connecting') : t('home.login')}
            </Link>
          </div>
        )}
        <div className={styles.titleBtnBox}>
          {/*<div className={`${styles.imgBox} ${styles.net}`} onClick={() => setNetDrawerOpened(true)}>*/}
          {/*  <img src={netBtn} alt="" width="18" />*/}
          {/*</div>*/}
          {/*<div className={styles.imgBox}} onClick={() => setLangDrawerOpened(false)}>*/}
          {/*<img src={langBtn} alt="" width="18" />*/}
          <FormControlLabel
            control={
              <MaterialUISwitch
                sx={{ m: 1 }}
                defaultChecked={localStorage.getItem('lang') === 'zh'}
                onChange={e => {
                  const lang = e.target.checked ? 'zh' : 'en';
                  localStorage.setItem('lang', lang);
                  window.location.reload();
                }}
              />
            }
            label=""
          />
          {/*</div>*/}
        </div>
      </div>
      <div className={styles.tableBox}>
        <PriceTable />
      </div>
      <div className={styles.chartBox}>
        {/*<div className={styles.chartTitle}>{t('home.treasury')}</div>*/}
        <MarketChart />
      </div>
      <div className={styles.chartBox}>
        <NetWorthChart />
      </div>
      <div className={styles.chartBox}>
        <TotalSupplyChart />
      </div>
      {ethersProvider && <TotalSupplyBox />}
      <NetDrawer
        opened={netDrawerOpened}
        close={() => setNetDrawerOpened(false)}
        netChecked={netChecked}
        setNetChecked={setNetChecked}
      />
      {/*<WalletDrawer opened={walletDrawerOpened} close={() => setWalletDrawerOpened(false)} />*/}
      <LangDrawer opened={langDrawerOpened} close={() => setLangDrawerOpened(false)} />
    </div>
  );
}

function TotalSupplyBox() {
  return (
    <>
      <div className={styles.mintBox}>
        <ValueCard type={VALUE_TYPE.treasury} />
        <ValueCard type={VALUE_TYPE.rate} />
      </div>
      <div className={styles.mintBox}>
        <ValueCard type={VALUE_TYPE.EZAT} />
        <ValueCard type={VALUE_TYPE.EZBT} />
      </div>
    </>
  );
}

enum VALUE_TYPE {
  EZAT = 'EZAT',
  EZBT = 'EZBT',
  treasury = 'treasury',
  rate = 'rate',
}
function ValueCard({ type }: { type: VALUE_TYPE }) {
  const { t } = useTranslation();
  const { ethersProvider } = useWallet();

  const api = {
    EZAT: ezatTotalSupply,
    EZBT: ezbtTotalSupply,
    treasury: treasuryTotalNetWorth,
    rate: treasuryInterestRate,
  };
  const title = {
    EZAT: t('home.EZAT_totalSupply'),
    EZBT: t('home.EZBT_totalSupply'),
    treasury: t('home.treasury_totalValue'),
    rate: t('home.EZAT_Rate'),
  };
  const { data } = useQuery(['totalSupply', type], () => api[type](ethersProvider!.getSigner()), {
    onSuccess: data1 => {
      // if (type === VALUE_TYPE.rate) {
      //   const res = formatNetWorth(data1);
      //   debugger;
      // }
    },
  });
  return (
    <div className={styles.mintCard}>
      <div className={styles.mintCardTitle}>{title[type]}</div>
      {type === VALUE_TYPE.rate ? (
        <div className={styles.mintCardValue}>{data ? (parseFloat(formatNetWorth(data)) / 10000).toFixed(2) : 0} ‱</div>
      ) : (
        <div className={styles.mintCardValue}>{data ? toNum(data).toFixed() : 0}</div>
      )}
      {/*<div className={styles.mintCardValue}>{data ? formatNetWorth(data) : 0}</div>*/}
    </div>
  );
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 48,
  height: 34,
  // padding: 7,
  '& .MuiSwitch-switchBase': {
    marginLeft: 2,
    marginRight: 10,
    marginTop: 9,
    marginBottom: 10,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'中'",
        fontSize: '10px',
        lineHeight: '16px',
        fontWeight: 700,
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? '#d44318' : '#001e3c',
        borderRadius: '20px',
        // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        //   '#fff',
        // )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#1baa00' : '#001e3c',
    width: 16,
    height: 16,
    '&:before': {
      content: "'E'",
      fontSize: '10px',
      lineHeight: '17px',
      fontWeight: 700,
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      // backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      //   '#fff',
      // )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));
