import { Box, Button, Card, IconButton, Typography } from '@mui/material';
import TestQrCode from '../assets/test_qr_code.png';
import { useMobileMatch } from '../hooks/useMobileMatch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

type QrCodePopupProps = {
  onPopupClose: () => void, 
  hidden?: boolean,
  onLinkSave: () => void,
  onCodeSave: () => void
}

const BACKGROUND_TOP_PADDING = 5;
const POPUP_H1_BOTTOM_MARGIN = '4px';
const POPUP_PARAGRAPH_Y_MARGIN = '8px';

const QrCodeSizes = {
  DESKTOP_MIN_WIDTH: '80%',
  MOBILE_MIN_WIDTH: '50%'
}

const CardSizes = {
  DESKTOP_WIDTH: '30%',
  MOBILE_WIDTH: '80%',
  DESTOP_MIN_WIDTH: '300PX'
}

export default function QrCodePopup({onPopupClose, onLinkSave, onCodeSave, hidden=false}: QrCodePopupProps) {
  const isMatching = useMobileMatch();

  const onPopupEscDown = (evt: KeyboardEvent) => {
    if(evt.key === 'Escape') {
      onPopupClose();
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onPopupEscDown);

    return () => {
      document.removeEventListener('keydown', onPopupEscDown)
    };
  });

  return (
    <Box 
      zIndex={2}
      bgcolor='rgba(0, 0, 0, 0.5)'
      position='fixed'
      top={0}
      left={0}
      bottom={0}
      right={0}
      padding={0}
      width='100vw'
      height='100vh'
      paddingTop={BACKGROUND_TOP_PADDING}
      hidden={hidden}
      >
      <Card style={
        {
          width: isMatching ? CardSizes.MOBILE_WIDTH : CardSizes.DESKTOP_WIDTH, 
          minWidth: isMatching ? undefined : CardSizes.DESTOP_MIN_WIDTH
        }
      }>
        <Box
          alignSelf='flex-end'>
          <IconButton onClick={onPopupClose}>
            <CloseIcon sx={{color: 'white'}}/>
          </IconButton>
        </Box>
        <Box hidden={!isMatching}>
          <h1 style={{marginTop: '0', marginBottom: POPUP_H1_BOTTOM_MARGIN}}>Поделиться комнатой</h1>
          <Typography marginY={POPUP_PARAGRAPH_Y_MARGIN}>
            Приглашайте до 10 друзей в вашу команду, чтобы совместно сразиться против нейросети! 
            Делитесь ссылкой на комнату, кодом комнаты или следующим QR-кодом:</Typography>
        </Box>
        
        <img style={{alignSelf: 'center'}} src={TestQrCode} width={isMatching ? QrCodeSizes.MOBILE_MIN_WIDTH : QrCodeSizes.DESKTOP_MIN_WIDTH}/>

        <Box hidden={!isMatching}>
          <Button 
            variant='text' 
            endIcon={<ContentCopyIcon />}
            onClick={onLinkSave}>
              Копировать ссылку на комнату
          </Button>

          <Button 
            variant='text' 
            endIcon={<ContentCopyIcon />}
            onClick={onCodeSave}>
              Копировать код комнаты
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
