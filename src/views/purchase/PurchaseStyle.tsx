import { Box, Button, Card, FormControl, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { IProps } from '../../types/styleType';

const CONTAINER_WIDTH = '90%';

const PurchaseContainer = styled((props: IProps) => {
  const theme: any = useTheme();
  return (
    <div style={{ padding: '0 15px' }}>
      <Card {...props} sx={{ background: theme.palette.purchase.containerBg }} />
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
  return <Card {...props} />;
})(() => {
  return {
    width: CONTAINER_WIDTH,
    height: 109,
    position: 'relative',
    // @ts-ignore
    background: useTheme().palette.purchase.cardBg,
    boxShadow: 'none',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 50,
      height: 50,
      borderRadius: '100%',
      top: '100%',
      left: '50%',
      transform: 'translate(-50%, -25%)',
      border: '1px solid  rgba(145, 158, 171, 0.24);',
    },
  };
});

const ContentTop = styled((props: IProps) => {
  return <Card {...props} />;
})(() => {
  return {
    width: CONTAINER_WIDTH,
    height: 109,
    position: 'relative',
    // @ts-ignore
    background: useTheme().palette.purchase.cardBg,
    boxShadow: 'none',
    ':after': {
      position: 'absolute',
      content: '""',
      width: 50,
      height: 50,
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
    // @ts-ignore
    background: useTheme().palette.purchase.cardBg,
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
      background: theme.palette.primary.main,
      border: 'none',
      ':hover': {
        // @ts-ignore
        background: theme.palette.action.btnHover,
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
    height: 83,
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
    width: '100%',
    bgColor: 'red',
  };
});

const FooterContent = styled('div')(() => {
  return {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    width: CONTAINER_WIDTH,
    fontSize: 12,
    letterSpacing: 0,
    marginTop: 10,
  };
});

const UnitconverContent = styled((props: IProps) => {
  return <Card {...props} />;
})(() => {
  return {
    width: CONTAINER_WIDTH,
    // @ts-ignore
    background: useTheme().palette.purchase.cardBg,
    marginTop: 5,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    boxShadow: 'none',
    p: {
      fontSize: 14,
      display: 'flex',
      alignItems: 'center',
      '.icon': {
        width: 14,
        height: 14,
        margin: '0 10px 1px 20px',
        fill: 'rgba(112, 78, 250, 1)',
      },
    },
  };
});

const SlippagePopoverContent = styled((props: IProps) => {
  return <Card {...props} />;
})(() => {
  return {
    width: 317,
    height: 178,
    // @ts-ignore
    background: useTheme().palette.purchase.slippageBg,
    div: {
      header: {
        display: 'flex',
        alignItems: 'center',
        p: {
          '.icon': {
            width: 14,
            height: 14,
            fill: 'rgba(112, 78, 250, 1)',
          },
        },
      },
      footer: {
        height: 36,
        flex: 1,
        display: 'flex',
        '.MuiOutlinedInput-input': {
          textAlign: 'right',
        },
      },
    },
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
  UnitconverContent,
  SlippagePopoverContent,
};
