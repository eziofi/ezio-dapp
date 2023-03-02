import React from 'react';
import { Box, Skeleton } from '@mui/material';

export default function RenderSkeleton() {
  return (
    <Box height={365} sx={{ marginTop: '15px' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
        <Skeleton key={item} animation={'pulse'} sx={{ margin: '5px 0' }} />
      ))}
    </Box>
  );
}
