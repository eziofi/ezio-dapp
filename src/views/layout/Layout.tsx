import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomePage from '../homePage/HomePage';
import icon_home01 from '../../assets/nav/icon_home01@2x.png';
import icon_home02 from '../../assets/nav/icon_home02@2x.png';
import icon_purchase01 from '../../assets/nav/icon_purchase01@2x.png';
import icon_purchase02 from '../../assets/nav/icon_purchase02@2x.png';
import icon_account01 from '../../assets/nav/icon_account01@2x.png';
import icon_account02 from '../../assets/nav/icon_account02@2x.png';
import icon_swap01 from '../../assets/nav/icon_swap01@2x.png';
import icon_swap02 from '../../assets/nav/icon_swap02@2x.png';
import { useTranslation } from 'react-i18next';
import Purchase from '../purchase/Purchase';
import Redeem from '../redeem/Redeem';
import Account from '../account/Account';
import styles from './layout.module.less';

export default function Layout() {
  const [currentTab, setCurrentTab] = React.useState(0);
  const { t } = useTranslation();
  return (
    <Box className={styles.tabContentBox}>
      {(() => {
        switch (currentTab) {
          case 0:
            return <HomePage />;
          case 1:
            return <Purchase />;
          case 2:
            return <Redeem />;
          case 3:
            return <Account />;
          default:
            return <></>;
        }
      })()}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100vw' }} elevation={3}>
        <BottomNavigation
          showLabels
          value={currentTab}
          onChange={(event, newValue) => {
            setCurrentTab(newValue);
          }}
        >
          <BottomNavigationAction
            label={t('nav.home')}
            icon={<img src={currentTab === 0 ? icon_home02 : icon_home01} alt="" width="28" />}
          />
          <BottomNavigationAction
            label={t('nav.purchase')}
            icon={<img src={currentTab === 1 ? icon_purchase02 : icon_purchase01} alt="" width="28" />}
          />
          <BottomNavigationAction
            label={t('nav.redeem')}
            icon={<img src={currentTab === 2 ? icon_swap02 : icon_swap01} alt="" width="28" />}
          />
          <BottomNavigationAction
            label={t('nav.account')}
            icon={<img src={currentTab === 3 ? icon_account02 : icon_account01} alt="" width="28" />}
          />
          {/*<BottomNavigationAction*/}
          {/*  label={t('nav.wallet')}*/}
          {/*  icon={<img src={currentTab === 4 ? icon_account02 : icon_account01} alt="" width="28" />}*/}
          {/*/>*/}
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
