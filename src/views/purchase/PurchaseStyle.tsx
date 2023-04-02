import { Box, Button, Card, FormControl, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import { StyleProps } from '../../types/styleType';

const CONTAINER_WIDTH = '90%';

const PurchaseContainer = styled((props: StyleProps) => {
  const theme: any = useTheme();
  return (
    <div
      style={{
        width: '100%',
        height: 'calc(100vh - 168px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Card {...props} sx={{ background: `${theme.palette.purchase.containerBg}` }} />
    </div>
  );
})(() => {
  const theme = useTheme();
  return {
    width: 500,
    paddingBottom: 30,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    // @ts-ignore
    border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(152, 161, 192, 0.24)' : 'rgb(210, 217, 238)'}`,
    borderRadius: '16px',
  };
});

const ContentBottom = styled((props: StyleProps) => {
  return <Card {...props} />;
})(() => {
  const theme = useTheme();
  return {
    width: CONTAINER_WIDTH,
    height: 109,
    position: 'relative',
    // @ts-ignore
    background: theme.palette.purchase.cardBg,
    boxShadow: 'none',
  };
});

const ContentTop = styled((props: StyleProps) => {
  return <Card {...props} />;
})(() => {
  const theme = useTheme();
  return {
    width: CONTAINER_WIDTH,
    height: 109,
    position: 'relative',
    // @ts-ignore
    background: theme.palette.purchase.cardBg,
    boxShadow: 'none',
  };
});

const ConverBtn = styled('div')(() => {
  const theme = useTheme();

  return {
    margin: '-19px auto',
    zIndex: 2,
    // @ts-ignore
    border: `4px solid ${theme.palette.purchase.containerBg}`,
    borderRadius: '12px',
    '.iconBtn': {
      width: 35,
      height: 35,
      borderRadius: '12px',
      // @ts-ignore
      background: theme.palette.purchase.cardBg,
      ':hover': {
        opacity: '0.7',
      },
      '.icon': {
        width: 35,
        height: 35,
        // @ts-ignore
        fill: 'rgb(152, 161, 192)',
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

const FormControlStyle = styled((props: StyleProps) => {
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

const UnitconverContent = styled((props: StyleProps) => {
  return <Card {...props} />;
})(() => {
  const theme = useTheme();
  return {
    width: CONTAINER_WIDTH,
    // @ts-ignore
    background: theme.palette.purchase.cardBg,
    marginTop: 5,
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    boxShadow: 'none',
    padding: '0 20px',
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

const SlippagePopoverContent = styled((props: StyleProps) => {
  return <Card {...props} />;
})(() => {
  const theme = useTheme();
  return {
    width: 317,
    // height: 178,
    // @ts-ignore
    background: theme.palette.purchase.slippageBg,
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
