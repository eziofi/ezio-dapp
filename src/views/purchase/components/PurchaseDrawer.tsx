import styles from '../purchase.module.less';
import closeBtn from '../../../assets/home/close@2x.png';
import { Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface INetDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function PurchaseDrawer({ opened, close }: INetDrawerProps) {
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <div className={styles.bottomDrawer}>
        <div className={styles.bottomDrawerBar}>
          <div className={styles.bottomDrawerBarTitleBox}>
            <div className={styles.bottomDrawerBarTitle}>{t('purchase.tipTitle')}</div>
          </div>
          <div className={styles.closeBox} onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </div>
        </div>
        <div className={styles.contentBox}>
          <p>{t('tips.line1')}</p>
          <p>{t('tips.line2')}</p>
          <p>{t('tips.line3')}</p>
        </div>
      </div>
    </Drawer>
  );
}
