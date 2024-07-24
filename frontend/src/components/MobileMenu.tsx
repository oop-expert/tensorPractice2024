import { Box, Button, Divider } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Colors } from '../utils/utils';
import { matchPath, useLocation } from 'react-router-dom';
import { openQrPopup, openQuitPopup } from '../store/popupSlice';
import { useAppDispatch } from '../store/storeHooks';


export default function MobileMenu({isOpened, closeMenu}: {isOpened: boolean, closeMenu: () => void}) {
  const {pathname} = useLocation();

  const shouldDisplayShare = matchPath('/lobby/:id', pathname);

  const dispatch = useAppDispatch();

  const onQrOpen = () => {
    closeMenu();
    dispatch(openQrPopup());
  };

  const onQuitOpen = () => {
    closeMenu();
    dispatch(openQuitPopup(false));
  };

  return (
    <Box
      display={isOpened ? 'flex' : 'none'}
      flexDirection='column'
      alignItems='flex-start'
      position='absolute'
      top={50}
      right={0}
      width='max-content'
      maxWidth='215px'
      bgcolor={Colors.PANEL}
      borderRadius={5}
      zIndex={2}
      sx={{
        borderStartEndRadius: 0
      }}>
        <Button style={{display: shouldDisplayShare ? 'flex' : 'none'}} variant='text' color='secondary' endIcon={<ShareIcon />} onClick={onQrOpen}>
          Поделиться
        </Button>

        <Divider style={{color: Colors.Text.HIGHLIGHT_MINOR}}/>

        <Button variant='text' color='secondary' endIcon={<ArrowBackIcon />} onClick={onQuitOpen}>
          Выйти из игры
        </Button>
    </Box>
  );
}
