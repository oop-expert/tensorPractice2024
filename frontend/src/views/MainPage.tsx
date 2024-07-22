import { Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { selectPlayer, signUp } from '../store/playerSlice';
import { useSelector } from 'react-redux';
import { postCreateGame, selectGame } from '../store/gameSlice';
import { useAppDispatch } from '../store/storeHooks';

const DESKTOP_MAIN_PANEL_MARGIN = '10vh auto 0';
const H_TABLET_MAIN_PANEL_MARGIN = '5vh auto 0';
const V_TABLET_MAIN_PANEL_MARGIN = '15% auto 0';

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
  const [code, setCode] = useState<string>('');
  
  const {isMobile, isHorizontalTablet, isVerticalTablet, isDesktop} = useMediaMatch();

  const {game, status: gameStatus} = useSelector(selectGame);
  const player = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  const onGameCreate = () => {
    dispatch(signUp(true));
    dispatch(postCreateGame());
  };

  const onGameJoin = () => {
    dispatch(signUp(false));
  }; 

  useEffect(() => {
    if(game.id > 0) {
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
          <RegistrationForm />
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
                        disabled={!code || !player.name}
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
                disabled={!player.name || gameStatus === 'loading'}
                onClick={onGameCreate}>
                  {gameStatus === 'loading' ? <CircularProgress color='primary'/> : <>Создать комнату</>}
              </Button>
          </Panel>
      </PanelGroup>
    </PanelGroup>
  );
}
