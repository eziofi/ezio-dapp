import styles from '../homePage.module.less';
import langBtn from '../../../assets/home/lang@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ILangDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function LangDrawer({ opened, close }: ILangDrawerProps) {
  const [langChecked, setLangChecked] = useState(localStorage.getItem('lang'));
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <div className={styles.bottomDrawer}>
        <div className={styles.bottomDrawerBar}>
          <div className={styles.bottomDrawerBarTitleBox}>
            <div className={`${styles.imgBox} ${styles.lang}`}>
              <img src={langBtn} alt="" width="18" />
            </div>
            <div className={styles.bottomDrawerBarTitle}>{t('home.lang')}</div>
          </div>
          <div className={styles.closeBox} onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </div>
        </div>
        <FormGroup className={styles.langForm}>
          <FormControlLabel
            sx={{ width: '110px' }}
            control={
              <Checkbox
                checked={langChecked === 'zh'}
                onChange={() => {
                  localStorage.setItem('lang', 'zh');
                  setLangChecked('zh');
                  close();
                  window.location.reload();
                }}
              />
            }
            label="简体中文"
          />
          <FormControlLabel
            sx={{ width: '110px' }}
            control={
              <Checkbox
                checked={langChecked === 'en'}
                onChange={() => {
                  localStorage.setItem('lang', 'en');
                  setLangChecked('en');
                  close();
                  window.location.reload();
                }}
              />
            }
            label="En"
          />
        </FormGroup>
      </div>
    </Drawer>
  );
}
