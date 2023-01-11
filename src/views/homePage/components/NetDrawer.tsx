import styles from '../homePage.module.less';
import netBtn from '../../../assets/home/net@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface INetDrawerProps {
  opened: boolean;
  close: () => void;
  netChecked: string;
  setNetChecked: React.Dispatch<React.SetStateAction<string>>;
}

export default function NetDrawer({ opened, close, netChecked, setNetChecked }: INetDrawerProps) {
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <div className={styles.bottomDrawer}>
        <div className={styles.bottomDrawerBar}>
          <div className={styles.bottomDrawerBarTitleBox}>
            <div className={`${styles.imgBox} ${styles.net}`}>
              <img src={netBtn} alt="" width="18" />
            </div>
            <div className={styles.bottomDrawerBarTitle}>{t('home.net')}</div>
          </div>
          <div className={styles.closeBox} onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </div>
        </div>
        <FormGroup className={styles.netForm}>
          <FormControlLabel
            sx={{ width: '95px' }}
            control={
              <Checkbox
                checked={netChecked === 'mainnet'}
                onChange={() => {
                  setNetChecked('mainnet');
                  close();
                }}
              />
            }
            label={t('home.mainnet')}
          />
          <FormControlLabel
            sx={{ width: '95px' }}
            control={
              <Checkbox
                checked={netChecked === 'testnet'}
                onChange={() => {
                  setNetChecked('testnet');
                  close();
                }}
              />
            }
            label={t('home.testnet')}
          />
        </FormGroup>
      </div>
    </Drawer>
  );
}
