import { Card, CardContent, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { IProps } from '../styleType';

export const AccountToolBar = styled((props: IProps) => {
  return <Toolbar {...props} />;
})(() => {
  return {
    width: '98%',
    maxHeight: 30,
    alignSelf: 'flex-start',
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
    margin: '0 auto',
  };
});

export const AccountCardBox = styled((props: IProps) => {
  return <Box {...props} />;
})(() => {
  return {
    width: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
    // background: 'red',
  };
});

export const AccountCard = styled((props: IProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    // height: 109,
    ':nth-of-type(2)': {
      margin: '10px 0',
    },
  };
});

export const Content = styled((props: IProps) => <CardContent {...props} />)(() => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
});
