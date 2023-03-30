import { Card, CardContent, styled, Toolbar } from '@mui/material';
import { Box } from '@mui/system';
import { StyleProps } from '../../types/styleType';

export const AccountToolBar = styled((props: StyleProps) => {
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

export const AccountCardBox = styled((props: StyleProps) => {
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

export const AccountCard = styled((props: StyleProps) => {
  return <Card {...props} variant="outlined" />;
})(() => {
  return {
    marginBottom: 10,
    ':last-child': {
      marginBottom: 0,
    },
  };
});

export const Content = styled((props: StyleProps) => <CardContent {...props} />)(() => {
  return {
    display: 'flex',
    alignItems: 'center',
  };
});
