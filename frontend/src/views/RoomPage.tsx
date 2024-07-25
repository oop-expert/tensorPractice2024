import {Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from 'react-redux';
import { selectGame } from '../store/gameSlice';
import { selectPlayer } from '../store/playerSlice';
import { useAppDispatch } from '../store/storeHooks';
import { WebSocketActionTypes } from '../store/webSocketMiddleware';
import QuitGamePopup from '../components/QuitGamePopup';

export default function RoomPage() {
  const {game} = useSelector(selectGame);
  const {player} = useSelector(selectPlayer)
  const {isMobile, isVerticalTablet} = useMediaMatch();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onQuit = () => {
    dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.id, username: player.name, avatarId: player.avatarId}});
    navigate('/');
  };

  if(isMobile || isVerticalTablet) {
    return (
      <>
          <Box className='app'>
        <Timer />
        <QuitGamePopup quitGame={onQuit}/>
        </Box>
      </>
    );
  }

  return(
    <Box className='app'>
       <Timer />       
      <QuitGamePopup quitGame={onQuit}/>
    </Box>
  );
}
