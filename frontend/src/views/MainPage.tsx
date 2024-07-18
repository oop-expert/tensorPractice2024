import { Button, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { AVATARS, generateRandomId, WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { signUp } from '../store/playerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Player from '../utils/types/Player';
import { createGame, joinGame, selectGame } from '../store/gameSlice';

const DESKTOP_MAIN_PANEL_MARGIN = '10vh auto 0';
const TABLET_MAIN_PANEL_MARGIN = '5vh auto 0';

const avatarIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATARS.length - 1
  : Math.abs(colorId + step) % AVATARS.length
);

export default function MainPage() {
  const [avatarId, dispatchAvatarId] = useReducer(avatarIdReducer, 0);
  const avatar = AVATARS[avatarId];
  
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');
  
  const {isMobile, isDesktop} = useMediaMatch();

  const game = useSelector(selectGame);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(evt.target.value);

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  const generatePlayer = (isHost: boolean) => {
    const player: Player = {
      id: generateRandomId(),
      name: username,
      avatar,
      isHost,
      isReady: false,
      score: 0,
      createdAt: new Date().toString()
    };

    return player;
  };

  const onGameCreate = () => {
    const player = generatePlayer(true);
    dispatch(signUp(player));
    dispatch(createGame(player));
  };

  const onGameJoin = () => {
    const player = generatePlayer(false);
    dispatch(signUp(player));
    dispatch(joinGame({code, player}));
  };

  useEffect(() => {
    if(game.id > 0) {
      navigate(`/lobby/${game.id}`)
    }
  });

  return (
    <PanelGroup 
      position='relative'
      direction={isDesktop ? 'row' : 'column'} 
      margin={isMobile ? 0 : (isDesktop ? DESKTOP_MAIN_PANEL_MARGIN : TABLET_MAIN_PANEL_MARGIN)} 
      width={isMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN}
      height={isMobile ? '90vh' : '80vh'}
      gap='30px'>
        <PanelGroup direction='column'>
          <RegistrationForm 
            username={username} 
            onUsernameChange={onUsernameChange}
            avatar={avatar}
            dispatchAvatarId={dispatchAvatarId}/>
        </PanelGroup>

        <PanelGroup direction='column' gap='30px'>
          <MainAppBar isInternal/>

            <Panel isMatchingMobile={isMobile}>
              <Typography variant='h2' hidden={isMobile}>Создайте комнату или войдите в уже существующую</Typography>
              <TextField
                id='code'
                placeholder='Код игровой сессии'
                onChange={onCodeChange}
                InputProps={(
                  {
                    endAdornment: (
                      <Button
                        variant='contained'
                        color='secondary'
                        disabled={!code || !username}
                        onClick={onGameJoin}>
                          Войти
                      </Button>
                    ),
                    sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
                  }
                )}/>

              <Divider textAlign='center'><Typography variant='body1'>или</Typography></Divider>

              <Button 
                variant='contained' 
                color='primary'
                disabled={!username}
                onClick={onGameCreate}>
                  Создать комнату
              </Button>
          </Panel>
      </PanelGroup>
    </PanelGroup>
  );
}
