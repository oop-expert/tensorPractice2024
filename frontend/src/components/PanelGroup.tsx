import { Box } from '@mui/material';
import PanelProps from '../utils/types/PanelProps';

export default function PanelGroup({children, direction='row', justifyContent='unset', width='100%', height='inherit', gap=0, margin=0, hidden=false, sx={}}: PanelProps) {
  return (
    <Box 
      display={hidden ? 'none' : 'flex'}
      flexDirection={direction} 
      justifyContent={justifyContent}
      gap={gap}
      width={width}
      height={height}
      minHeight='fit-content'
      margin={margin}
      sx={sx}>
        {children}
    </Box>
  );
}
