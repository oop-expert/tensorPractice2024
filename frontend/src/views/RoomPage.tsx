import {Grid} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Timer from '../components/Timer';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from 'react-redux';
import { selectGame } from '../store/gameSlice';
import { selectPlayer } from '../store/playerSlice';
import { useAppDispatch } from '../store/storeHooks';
import { WebSocketActionTypes } from '../store/webSocketMiddleware';
import RoomUserInfo from '../components/RoomUserInfo';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
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
        <Timer />
        <QuitGamePopup quitGame={onQuit}/>
      </>
    );
  }

  return(
    <>
      <Grid 
        container 
        width={WIDTH_RELATIVE_TO_SCREEN} 
        margin='0 auto' 
        height='80vh' 
        justifyContent='space-between' 
        alignItems='stretch'
        columns={24} >
        <Grid item md={6} paddingRight='2vh'>
          <RoomUserInfo />
        </Grid>
        <Grid item md={18}>
          <Timer />
        </Grid>
      </Grid>
        
      <QuitGamePopup quitGame={onQuit}/>
    </>
  );
}
