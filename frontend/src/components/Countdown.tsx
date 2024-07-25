import { Box, Typography } from '@mui/material';
import { Colors } from '../utils/utils';
import { useMediaMatch } from '../hooks/useMobileMatch';

export default function Countdown({minutes, seconds}: {minutes: number, seconds: number}) {
  const {isMobile, isVerticalTablet} = useMediaMatch();

  const isSmall = isMobile || isVerticalTablet;

  return (
    <Box 
      margin={'0 auto'}
      marginTop={'20px'}
      width={isSmall ? 'fit-content' : '100%'}
      height={isSmall ? 'fit-content' : '100%'}
      border={isSmall ? 'none' : `3px solid ${Colors.Text.HIGHLIGHT_MINOR}`}
      padding={isSmall ? '12px 16px' : 0}
      borderRadius={50}
      color={Colors.Text.HIGHLIGHT_MINOR}
      bgcolor={Colors.Text.ON_BUTTON}
      alignContent='center'>
        <Typography component='span' variant='h2'>{String(minutes).padStart(2, '0')}</Typography>
        <Typography component='span' variant='h2'>:</Typography>
        <Typography component='span' variant='h2'>{String(seconds).padStart(2, '0')}</Typography>
    </Box>
  );
}
