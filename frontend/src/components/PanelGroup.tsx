import { Box } from '@mui/material';
import PanelProps from '../utils/types/PanelProps';

export default function PanelGroup({children, direction='row', width='100%', margin=0}: PanelProps) {
  return (
    <Box 
      display='flex'
      flexDirection={direction} 
      gap={direction === 'row' ? '30px' : '45px'}
      width={width}
      margin={margin}>
        {children}
    </Box>
  );
}
