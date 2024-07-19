import { Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { AVATARS, generateRandomId, WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { signUp } from '../store/playerSlice';
import { useSelector } from 'react-redux';
import Player from '../utils/types/Player';
import { postCreateGame, joinGame, selectGame, getQuestion } from '../store/gameSlice';
import { useAppDispatch } from '../store/storeHooks';

const DESKTOP_MAIN_PANEL_MARGIN = '10vh auto 0';
const H_TABLET_MAIN_PANEL_MARGIN = '5vh auto 0';
const V_TABLET_MAIN_PANEL_MARGIN = '15% auto 0';

const avatarIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATARS.length - 1
  : Math.abs(colorId + step) % AVATARS.length
);

const getPanelMargin = (isMobile: boolean, isHTablet: boolean, isVTablet: boolean) => {
  if(isMobile) {
    return 0;
  } else if(isHTablet) {
    return H_TABLET_MAIN_PANEL_MARGIN;
  } else if(isVTablet) {
    return V_TABLET_MAIN_PANEL_MARGIN;
  }

  return DESKTOP_MAIN_PANEL_MARGIN;
};

export default function MainPage() {
  const [avatarId, dispatchAvatarId] = useReducer(avatarIdReducer, 0);
  const avatar = AVATARS[avatarId];
  
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');
  
  const {isMobile, isHorizontalTablet, isVerticalTablet, isDesktop} = useMediaMatch();

  const {game, status: gameStatus} = useSelector(selectGame);
  const dispatch = useAppDispatch();

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
      createdAt: new Date().toString(),
      isRight: false
    };

    return player;
  };

  const onGameCreate = () => {
    const player = generatePlayer(true);
    dispatch(signUp(player));
    dispatch(postCreateGame());
  };

  const onGameJoin = () => {
    const player = generatePlayer(false);
    dispatch(signUp(player));
    dispatch(joinGame({code, player}));
  }; 

  useEffect(() => {
    if(game.id > 0) {
      dispatch(getQuestion(game.questions[0].id));
      navigate(`/lobby/${game.id}`);
    }
  });

  return (
    <PanelGroup 
      position='relative'
      direction={isDesktop || isHorizontalTablet ? 'row' : 'column'} 
      margin={getPanelMargin(isMobile, isHorizontalTablet, isVerticalTablet)} 
      width={isMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN}
      height={isMobile ? '100%' : '75vh'}
      gap={isMobile ? '10vh' : '30px'}>
        <PanelGroup direction='column'>
          <RegistrationForm 
            username={username} 
            onUsernameChange={onUsernameChange}
            avatar={avatar}
            dispatchAvatarId={dispatchAvatarId}/>
        </PanelGroup>

        <PanelGroup direction='column' gap='30px'>
          <MainAppBar isInternal/>

            <Panel isMatchingMobile={isMobile} height={!isDesktop && !isHorizontalTablet ? 'fit-content' : '100%'}>
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
                disabled={!username || gameStatus === 'loading'}
                onClick={onGameCreate}>
                  {gameStatus === 'loading' ? <CircularProgress color='primary'/> : <>Создать комнату</>}
              </Button>
          </Panel>
      </PanelGroup>
    </PanelGroup>
  );
}
