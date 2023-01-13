import { Box, Button, Card, FormControl } from '@mui/material';
import { styled } from '@mui/system';

interface IProps {
  children?: React.ReactElement[] | React.ReactElement;
  className?: string;
}

const PurchaseContainer = styled((props: IProps) => {
  return <Card {...props} />;
})(() => {
  return {
    width: '95%',
    height: 588,
    opacity: 1,
    background: 'rgba(255, 255, 255, 1)',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
});

const ContentBottom = styled((props: IProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    width: '95%',
    height: 109,
    position: 'relative',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 45,
      height: 40,
      // background: '#eef1f9',
      borderRadius: '100%',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid  rgba(229, 224, 251, 1);',
    },
  };
});

const ContentTop = styled((props: IProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    width: '95%',
    height: 109,
    position: 'relative',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 45,
      height: 40,
      // background: '#eef1f9',
      borderRadius: '100%',
      top: 0,
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: '1px solid  rgba(229, 224, 251, 1);',
    },
  };
});

const ConverBtn = styled('div')(() => {
  return {
    minWidth: 40,
    maxWidth: 40,
    height: 40,
    borderRadius: '50%',
    alignContent: 'center',
    margin: '-15px 0 -15px 0',
    background: 'rgba(110, 76, 248, 1)',
    zIndex: 100,
    border: '1px solid rgba(145, 158, 171, 0.24)',
    // boxShadow: '0 0 2px 0 rgb(145 158 171 / 20%), 0 12px 24px -4px rgb(145 158 171 / 12%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 10,
    alignSelf: 'flex-start',
    color: 'rgba(76, 80, 97, 1)',
    fontSize: 14,
    letterSpacing: 0,
  };
});

const BuyBtn = styled('div')(() => {
  return {};
});

const ViewRule = styled('span')(() => {
  return {
    fontSize: 12,
    color: 'rgba(0, 111, 255, 1)',
  };
});

const FooterContent = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: 120,
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
  BuyBtn,
  ViewRule,
  FooterContent,
};
