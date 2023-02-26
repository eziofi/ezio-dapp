import { Box, Skeleton } from '@mui/material';

export function InlineSkeleton({ width = 150 }: { width?: number; height?: number }) {
  return (
    <div style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}>
      <Skeleton width={width} />
    </div>
  );
}
