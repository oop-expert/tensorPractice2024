import { Box } from '@mui/material';
import PanelProps from '../utils/types/PanelProps';

export default function PanelGroup({children, direction='row', justifyContent='unset', height, width='100%', gap, margin, hidden=false, sx={}}: PanelProps) {
  return (
    <Box 
      display={hidden ? 'none' : 'flex'}
      flexDirection={direction} 
      justifyContent={justifyContent}
      gap={gap}
      width={width}
      height={height}
      margin={margin}
      sx={sx}>
        {children}
    </Box>
  );
}
