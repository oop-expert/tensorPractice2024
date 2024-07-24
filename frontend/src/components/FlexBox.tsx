import { Box, SxProps } from '@mui/material';
import React from 'react';

type FlexBoxProps = {
  children: React.ReactNode,
  direction: 'row' | 'column',
  gap?: number | string,
  alignItems?: 'center' | 'flex-start' | 'flex-end',
  margin?: number | string,
  padding?: number | string,
  hidden?: boolean,
  sx?: SxProps
};

export default function FlexBox({children, direction, gap=0, alignItems='center', sx={}, margin=0, padding=0, hidden=false}: FlexBoxProps) {
  return (
    <Box 
      sx={sx} 
      display={hidden ? 'none' : 'flex'} 
      flexDirection={direction} 
      gap={gap} 
      alignItems={alignItems} 
      margin={margin} 
      padding={padding}>
        {children}
    </Box>
  );
}
