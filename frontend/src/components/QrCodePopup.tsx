import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import TestQrCode from '../assets/test_qr_code.png';
import { useMediaMatch } from '../hooks/useMobileMatch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';

type QrCodePopupProps = {
  isPopupOpened: boolean,
  onPopupClose: () => void, 
  onLinkSave: () => void,
  onCodeSave: () => void
}

const POPUP_H1_BOTTOM_MARGIN = '4px';
const POPUP_PARAGRAPH_Y_MARGIN = '8px';

const QrCodeSizes = {
  DESKTOP_MIN_WIDTH: '80%',
  MOBILE_MIN_WIDTH: '50%'
}

export default function QrCodePopup({isPopupOpened, onPopupClose, onLinkSave, onCodeSave}: QrCodePopupProps) {
  const {isMobile} = useMediaMatch();

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
      <Dialog open={isPopupOpened} onClose={onPopupClose}>
        <Box
          position='absolute'
          top={5}
          right={5}>
          <IconButton color='warning' onClick={onPopupClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box hidden={!isMobile}>
          <h1 style={{marginTop: '0', marginBottom: POPUP_H1_BOTTOM_MARGIN}}>Поделиться комнатой</h1>
          <Typography marginY={POPUP_PARAGRAPH_Y_MARGIN}>
            Приглашайте до 10 друзей в вашу команду, чтобы совместно сразиться против нейросети! 
            Делитесь ссылкой на комнату, кодом комнаты или следующим QR-кодом:</Typography>
        </Box>
        
        <img style={{alignSelf: 'center'}} src={TestQrCode} width={isMobile ? QrCodeSizes.MOBILE_MIN_WIDTH : QrCodeSizes.DESKTOP_MIN_WIDTH}/>

        <Box hidden={!isMobile}>
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
      </Dialog>
  );
}
