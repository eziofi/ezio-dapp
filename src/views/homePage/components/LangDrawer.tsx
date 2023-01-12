// import styles from '../homePage.module.less';
import langBtn from '../../../assets/home/lang@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  BottomDrawer,
  BottomDrawerBar,
  BottomDrawerBarTitle,
  BottomDrawerBarTitleBox,
  ImageBox,
  LangForm,
} from '../mainStyle';

interface ILangDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function LangDrawer({ opened, close }: ILangDrawerProps) {
  const [langChecked, setLangChecked] = useState(localStorage.getItem('lang'));
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <BottomDrawer>
        <BottomDrawerBar>
          <BottomDrawerBarTitleBox>
            <ImageBox sx={{ background: 'rgba(255, 141, 26, 1)' }}>
              <img src={langBtn} alt="" width="18" />
            </ImageBox>
            <BottomDrawerBarTitle>{t('home.lang')}</BottomDrawerBarTitle>
          </BottomDrawerBarTitleBox>
          <div onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </div>
        </BottomDrawerBar>
        <LangForm>
          <FormGroup>
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
        </LangForm>
      </BottomDrawer>
    </Drawer>
  );
}
