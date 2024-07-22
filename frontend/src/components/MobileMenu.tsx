import { Box, Button, Divider } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Colors } from '../utils/utils';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { openPopup } from '../store/popupSlice';
import { selectGame } from '../store/gameSlice';
import { WebSocketActionTypes } from '../store/webSocketMiddleware';
import { useAppDispatch } from '../store/storeHooks';
import { selectPlayer } from '../store/playerSlice';

export default function MobileMenu({isOpened, closeMenu}: {isOpened: boolean, closeMenu: () => void}) {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const shouldDisplayShare = matchPath('/lobby/:id', pathname);

  const {game} = useSelector(selectGame);
  const player = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const onPopupOpen = () => {
    closeMenu();
    dispatch(openPopup());
  };

  const onQuit = () => {
    closeMenu();
    dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.code, username: player.name, avatarId: player.avatarId}})
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
        <Button style={{display: shouldDisplayShare ? 'flex' : 'none'}} variant='text' color='secondary' endIcon={<ShareIcon />} onClick={onPopupOpen}>
          Поделиться
        </Button>

        <Divider style={{color: Colors.Text.HIGHLIGHT_MINOR}}/>

        <Button variant='text' color='secondary' endIcon={<ArrowBackIcon />} onClick={onQuit}>
          Выйти из игры
        </Button>
    </Box>
  );
}
