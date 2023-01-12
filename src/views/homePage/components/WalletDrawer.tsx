// import styles from '../homePage.module.less';
import walletBtn from '../../../assets/home/wallet@2x.png';
import closeBtn from '../../../assets/home/close@2x.png';
import metamaskBtn from '../../../assets/home/metamask@3x.png';
import walletConnectBtn from '../../../assets/home/walletConnect@3x.png';
import { Box, Drawer, ThemeProvider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  BottomDrawer,
  BottomDrawerBar,
  BottomDrawerBarTitleBox,
  BottomDrawerBarTitle,
  ImageBox,
  WalletForm,
  WalletFormItem,
  MetamaskImg,
  BtnLabel,
  WalletConnectImg,
} from '../mainStyle';

interface IWalletDrawerProps {
  opened: boolean;
  close: () => void;
}

export default function WalletDrawer({ opened, close }: IWalletDrawerProps) {
  const { t } = useTranslation();
  return (
    <Drawer anchor="bottom" open={opened} onClose={close}>
      <BottomDrawer>
        <BottomDrawerBar>
          <BottomDrawerBarTitleBox>
            <ImageBox>
              <img src={walletBtn} alt="" width="18" />
            </ImageBox>

            <BottomDrawerBarTitle>{t('home.wallet')}</BottomDrawerBarTitle>
          </BottomDrawerBarTitleBox>
          <Box onClick={close}>
            <img src={closeBtn} alt="" width="18" />
          </Box>
        </BottomDrawerBar>
        <WalletForm>
          <WalletFormItem>
            <MetamaskImg>
              <img src={metamaskBtn} alt="" width="42" />
            </MetamaskImg>
            <BtnLabel>Metamask</BtnLabel>
          </WalletFormItem>
          <WalletFormItem>
            <WalletConnectImg>
              <img src={walletConnectBtn} alt="" width="32" />
            </WalletConnectImg>
            <BtnLabel>WalletConnect</BtnLabel>
          </WalletFormItem>
        </WalletForm>
      </BottomDrawer>
    </Drawer>
  );
}
