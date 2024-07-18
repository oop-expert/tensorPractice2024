import { Box, Button, Divider } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Colors } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openPopup } from '../store/popupSlice';

export default function MobileMenu({isOpened, closeMenu}: {isOpened: boolean, closeMenu: () => void}) {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onPopupOpen = () => {
    closeMenu();
    dispatch(openPopup());
  };

  const onQuit = () => {
    closeMenu();
    navigate('/');
  };

  return (
    <Box
      display={isOpened ? 'flex' : 'none'}
      flexDirection='column'
      alignItems='flex-start'
      position='absolute'
      top={50}
      right={0}
      width='50vw'
      maxWidth='215px'
      bgcolor={Colors.PANEL}
      borderRadius={5}
      zIndex={2}
      sx={{
        borderStartEndRadius: 0
      }}>
        <Button variant='text' color='secondary' endIcon={<ShareIcon />} onClick={onPopupOpen}>
          Поделиться
        </Button>

        <Divider style={{color: Colors.Text.HIGHLIGHT_MINOR}}/>

        <Button variant='text' color='secondary' endIcon={<ArrowBackIcon />} onClick={onQuit}>
          Выйти из игры
        </Button>
    </Box>
  );
}
