import { Box, CardMedia, Dialog, IconButton, Typography } from '@mui/material';
import FlexBox from './FlexBox';
import Question from '../utils/types/Question';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import { useState } from 'react';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { Colors } from '../utils/utils';

export default function QuestionImage({question}: {question: Question}) {
  const {isMobile, isHorizontalTablet} = useMediaMatch();
  const [isZoomIn, setZoomIn] = useState<boolean>(false);

  const zoomIn = () => setZoomIn(true);
  const zoomOut = () => setZoomIn(false);

  const iconButtonWidth = isMobile ? '15vw' : '5vw'
  const iconWidth = isMobile ? '13pw' : '3vw';

  const imageWidth = isMobile ? '40vh' : '40vh';

  const hiddenAnswer = question.answer.slice().replace(/[а-яёa-z0-9]/gi, '_');

  return (
    <FlexBox direction='column'>
      <Typography variant='h2'>Название какого фильма изобразил ИИ?</Typography>
      <CardMedia 
        sx={{position: 'relative'}}
        image={!question || !question.image ? '' : `data:image/png;base64,${question.image}`}
        style={{width: imageWidth, height: imageWidth, borderRadius: '30px'}}>
          <Box position='absolute' top='20px' right='20px'>
            <IconButton color='secondary' onClick={zoomIn} style={{width: iconButtonWidth, height: iconButtonWidth}}>
              <ZoomInIcon sx={{fontSize: iconWidth}}/>
            </IconButton>
          </Box>
      </CardMedia>
      <Typography variant='h2' color={Colors.Text.HIGHLIGHT_MAJOR} alignItems='center' letterSpacing={3} marginTop={isHorizontalTablet ? '0.5vh' : '2vh'} lineHeight={1}>{hiddenAnswer}</Typography>
      
      <Dialog open={isZoomIn} onClose={zoomOut} PaperProps={{style: {padding: 0, width: '100%'}}}>
          <Box position='absolute' top='20px' right='20px'>
            <IconButton color='secondary' onClick={zoomOut} style={{width: iconButtonWidth, height: iconButtonWidth}}>
              <ZoomOutIcon sx={{fontSize: iconWidth}}/>
            </IconButton>
          </Box>
          <img src={!question || !question.image ? '' : `data:image/png;base64,${question.image}`} width='100%'/>
      </Dialog>
    </FlexBox>
  );
}
