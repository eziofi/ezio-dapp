import { Box, Button, Card, FormControl, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { IProps } from '../styleType';

const PurchaseContainer = styled((props: IProps) => {
  return (
    <div style={{ padding: '0 15px' }}>
      <Card {...props} />
    </div>
  );
})(() => {
  return {
    maxWidth: 500,
    height: '100%',
    // maxHeight: document.body.offsetHeight - 196,
    paddingBottom: 30,
    // margin: '0 30px 20px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
  };
});

const ContentBottom = styled((props: IProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    width: '90%',
    height: 109,
    position: 'relative',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 50,
      height: 50,
      // background: '#eef1f9',
      borderRadius: '100%',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, -25%)',
      border: '1px solid  rgba(145, 158, 171, 0.24);',
    },
  };
});

const ContentTop = styled((props: IProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    width: '90%',
    height: 109,
    position: 'relative',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 50,
      height: 50,
      // background: '#eef1f9',
      color: 'red',
      borderRadius: '100%',
      top: '0',
      right: '50%',
      transform: 'translate(50%, -75%)',
      border: '1px solid  rgba(145, 158, 171, 0.24)',
    },
  };
});

const ConverBtn = styled('div')(() => {
  const theme = useTheme();
  return {
    minWidth: 48,
    maxWidth: 48,
    height: 45,
    borderRadius: '50%',
    alignContent: 'center',
    margin: '-12px 0 -12px 0',
    background: theme.palette.background.paper,
    zIndex: 100,
    // border: '1px solid rgba(145, 158, 171, 0.24)',
    borderRight: 'none',
    borderLeft: 'none',
    // boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '.iconBtn': {
      width: 35,
      height: 35,
      borderRadius: '50%',
      background: 'rgba(110, 76, 248, 1)',
      border: 'none',
      ':hover': {
        background: 'rgba(110, 76, 248, 1)',
      },
    },
  };
});

const BodyContent = styled(Box)(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };
});

const BalanceContent = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  };
});

const FormControlStyle = styled((props: IProps) => {
  return <FormControl {...props} variant="standard" size="small" />;
})(() => {
  return {
    minWidth: 120,
    background: 'rgba(247, 248, 250, 1)',
    borderRadius: 5,
  };
});

const DateNow = styled('p')(() => {
  return {
    alignSelf: 'flex-start',
    color: 'rgba(76, 80, 97, 1)',
    fontSize: 14,
    letterSpacing: 0,
    width: '90%',
    bgColor: 'red',
    margin: '10px auto 20px',
  };
});

const FooterContent = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: 200,
    fontSize: 12,
    letterSpacing: 0,
    marginTop: 10,
  };
});

export {
  PurchaseContainer,
  ContentBottom,
  ConverBtn,
  ContentTop,
  BodyContent,
  BalanceContent,
  FormControlStyle,
  DateNow,
  FooterContent,
};
