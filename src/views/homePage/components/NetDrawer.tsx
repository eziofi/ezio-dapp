// import styles from '../homePage.module.less';
import netBtn from '../../../assets/home/net@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Box, Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  BottomDrawer,
  BottomDrawerBar,
  BottomDrawerBarTitle,
  BottomDrawerBarTitleBox,
  ImageBox,
  NetForm,
} from '../mainStyle';

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
      <BottomDrawer>
        <BottomDrawerBar>
          <BottomDrawerBarTitleBox>
            <ImageBox sx={{ background: 'rgba(121, 72, 234, 1)' }}>
              <img src={netBtn} alt="" width="18" />
            </ImageBox>
            <BottomDrawerBarTitle>{t('home.net')}</BottomDrawerBarTitle>
          </BottomDrawerBarTitleBox>
          <Box onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </Box>
        </BottomDrawerBar>
        <NetForm>
          <FormGroup>
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
        </NetForm>
      </BottomDrawer>
    </Drawer>
  );
}
