import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { useMediaMatch } from '../hooks/useMobileMatch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { selectPopupOpen, closePopup } from '../store/popupSlice';

type QrCodePopupProps = {
  onLinkSave: () => void,
  onCodeSave: () => void,
  qrCode: string
}

const POPUP_H1_BOTTOM_MARGIN = '4px';
const POPUP_PARAGRAPH_Y_MARGIN = '8px';

const QrCodeSizes = {
  DESKTOP_MIN_WIDTH: '80%',
  MOBILE_MIN_WIDTH: '70%'
}

export default function QrCodePopup({onLinkSave, onCodeSave, qrCode}: QrCodePopupProps) {
  const {isMobile, isDesktop} = useMediaMatch();
  const {isQrOpened} = useSelector(selectPopupOpen);
  const dispatch = useDispatch();

  const onPopupClose = () => dispatch(closePopup());

  const maxWidth = isMobile ? 'sm' : (isDesktop ? 'lg' : 'md');

  return (
      <Dialog open={isQrOpened} onClose={onPopupClose} maxWidth={maxWidth}>
        <Box
          position='absolute'
          top={5}
          right={5}>
          <IconButton color='warning' onClick={onPopupClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box hidden={!isMobile} width='100%'>
          <Typography variant='h1' style={{margin: '0 auto', marginBottom: POPUP_H1_BOTTOM_MARGIN, width: '80%'}}>Поделиться комнатой</Typography>
          <Typography variant='body1' marginY={POPUP_PARAGRAPH_Y_MARGIN}>
            Приглашайте до 10 друзей в вашу команду, чтобы совместно сразиться против нейросети! 
            Делитесь ссылкой на комнату, кодом комнаты или следующим QR-кодом:</Typography>
        </Box>
        
        <img style={{alignSelf: 'center'}} src={`data:image/png;base64,${qrCode}`} width={isMobile ? QrCodeSizes.MOBILE_MIN_WIDTH : QrCodeSizes.DESKTOP_MIN_WIDTH}/>

        <Box display={isMobile ? 'flex' : 'none'} flexDirection='column' gap={0.5} alignItems={'flex-start'}>
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
