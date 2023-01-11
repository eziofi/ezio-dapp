import styles from '../homePage.module.less';
import walletBtn from '../../../assets/home/wallet@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import metamaskBtn from '../../../assets/home/metamask@3x.png';
import walletConnectBtn from '../../../assets/home/walletConnect@3x.png';
import { Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IWalletDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function WalletDrawer({ opened, close }: IWalletDrawerProps) {
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <div className={styles.bottomDrawer}>
        <div className={styles.bottomDrawerBar}>
          <div className={styles.bottomDrawerBarTitleBox}>
            <div className={`${styles.imgBox} ${styles.wallet}`}>
              <img src={walletBtn} alt="" width="18" />
            </div>
            <div className={styles.bottomDrawerBarTitle}>{t('home.wallet')}</div>
          </div>
          <div className={styles.closeBox} onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </div>
        </div>
        <div className={styles.walletForm}>
          <div className={styles.walletFormItem}>
            <div className={styles.metamaskImg}>
              <img src={metamaskBtn} alt="" width="42" />
            </div>
            <div className={styles.btnLabel}>Metamask</div>
          </div>
          <div className={styles.walletFormItem}>
            <div className={styles.walletConnectImg}>
              <img src={walletConnectBtn} alt="" width="32" />
            </div>
            <div className={styles.btnLabel}>WalletConnect</div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
