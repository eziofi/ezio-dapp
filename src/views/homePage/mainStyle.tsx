import React from 'react';
import { styled } from '@mui/material/styles';

const TitleContainer = styled('div')(() => {
  return {
    margin: '29px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

const TitleBtnBox = styled('div')(() => {
  return {
    display: 'flex',
    marginRight: '32',
  };
});

const ImageBox = styled('div')(() => {
  return {
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    background: 'rgba(42, 130, 228, 1)',
  };
});

const ChartBox = styled('div')(() => {
  return {
    margin: '18px 0',
    padding: '18px 14px',
    // backgroundColor: 'rgba(26, 32, 47, 1)',
  };
});

const MintBox = styled('div')(() => {
  return {
    backgroundColor: 'rgba(26, 32, 47, 1)',
    padding: '19px 0',
    display: 'flex',
  };
});

const MintCard = styled('div')(() => {
  return {
    width: '40%',
    flex: 1,
    textAlign: 'center',
  };
});

const MintCardTitle = styled('div')(() => {
  return {
    fontSize: 12,
    color: 'rgba(120, 125, 145, 1)',
  };
});

const MintCardValue = styled('div')(() => {
  return {
    fontSize: 24,
  };
});

const BottomDrawer = styled('div')(() => {
  return { padding: '14px 14px' };
});

const BottomDrawerBar = styled('div')(() => {
  return { display: 'flex', justifyContent: 'spaceBetween', alignItems: 'center' };
});

const BottomDrawerBarTitleBox = styled('div')(() => {
  return { display: 'flex', alignItems: 'center' };
});

const BottomDrawerBarTitle = styled('div')(() => {
  return { fontSize: 24, marginLeft: 10 };
});

const WalletForm = styled('div')(() => {
  return { marginTop: 30, marginBottom: 20, display: 'flex', alignItem: 'center', padding: '0 30px' };
});

const WalletFormItem = styled('div')(() => {
  return { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' };
});

const MetamaskImg = styled('div')(() => {
  return {
    width: 42,
    height: 42,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  };
});

const BtnLabel = styled('div')(() => {
  return { fontSize: 14, color: 'rgba(181, 217, 255, 1)' };
});

const WalletConnectImg = styled('div')(() => {
  return {
    width: 42,
    height: 42,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: ' rgba(85, 151, 245, 1)',
  };
});

const NetForm = styled('div')(() => {
  return {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center',
  };
});

const LangForm = styled('div')(() => {
  return {
    width: 24,
    height: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  };
});

const HomeCardHeader = styled('div')(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '.homeCard_select': {
      '.MuiSelect-select': {
        minWidth: 100,
        fontSize: 14,
        padding: '0',
        textAlign: 'center',
      },
    },
  };
});

export {
  TitleContainer,
  TitleBtnBox,
  ImageBox,
  ChartBox,
  MintBox,
  MintCard,
  MintCardTitle,
  MintCardValue,
  BottomDrawer,
  BottomDrawerBar,
  BottomDrawerBarTitleBox,
  BottomDrawerBarTitle,
  WalletForm,
  WalletFormItem,
  MetamaskImg,
  BtnLabel,
  WalletConnectImg,
  NetForm,
  LangForm,
  HomeCardHeader,
};
