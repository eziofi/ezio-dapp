import React from 'react';
import { Box, Skeleton } from '@mui/material';

export default function RenderSkeleton() {
  return (
    <Box height={365} sx={{ display: 'flex', flexDirection: 'column' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
        <Skeleton key={item} animation={'pulse'} sx={{ margin: '5px 20px', flex: 1 }} />
      ))}
    </Box>
  );
}
