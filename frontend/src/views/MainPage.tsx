import { Box, Button, CircularProgress, Divider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { Colors, WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { selectPlayer, signUp } from '../store/playerSlice';
import { useSelector } from 'react-redux';
import { getGameByCode, postCreateGame, selectGame } from '../store/gameSlice';
import { useAppDispatch } from '../store/storeHooks';
import FlexBox from '../components/FlexBox';

const DESKTOP_MAIN_PANEL_MARGIN = '10vh auto 0';
const H_TABLET_MAIN_PANEL_MARGIN = '5vh auto 0';
const V_TABLET_MAIN_PANEL_MARGIN = '15% auto 0';

const getPanelMargin = (isMobile: boolean, isHTablet: boolean, isVTablet: boolean) => {
  if(isMobile) {
    return '0 0';
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

  const {game, status: gameStatus, errorCode, errorMessage} = useSelector(selectGame);
  const {player} = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  const onGameCreate = () => {
    dispatch(signUp(true));
    dispatch(postCreateGame());
  };

  const onGameJoin = () => {
    dispatch(signUp(false));
    dispatch(getGameByCode(code));
  }; 

  useEffect(() => {
    if(game.id > 0) {
      navigate(`/lobby/${game.code}`);
    }
  });

  return (
    <Box className='app' >
      <Box className='app__top-content'>
        <Typography variant='h2' sx={{marginTop:'40px'}}>
            Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
        </Typography>
        <PanelGroup 
          position='relative'
          direction={isDesktop || isHorizontalTablet ? 'row' : 'column'} 
          margin={getPanelMargin(isMobile, isHorizontalTablet, isVerticalTablet)} 
          width={isMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN}
          sx={{justifyContent: 'center', marginTop:'35px'}}>
            <PanelGroup direction='column'>
              <RegistrationForm />
            </PanelGroup>

            
        </PanelGroup>
    </Box>
    <PanelGroup direction='column' sx={{marginBottom:'35px', marginTop:'18px'}}>
          <MainAppBar isInternal/>

            <Panel isMatchingMobile={isMobile} height={!isDesktop && !isHorizontalTablet ? 'fit-content' : '100%'} sx={{justifyContent: 'center'}}>
              <Typography variant='h2' width={'100%'} hidden={isMobile}>Создайте комнату или войдите в уже существующую</Typography>
              
              <FlexBox direction='column' sx={{width: '100%'}}>
                <TextField
                  id='code'
                  placeholder='Код игровой сессии'
                  onChange={onCodeChange}
                  fullWidth
                  InputProps={(
                    {
                      disableUnderline: true,
                      endAdornment: (
                        <Button
                          variant='contained'
                          color='secondary'
                          disabled={!code || !player.name}
                          onClick={onGameJoin}>
                            {gameStatus === 'loading' ? <CircularProgress color='primary'/> : 'Войти'}
                        </Button>
                      ),
                      sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
                    }
                  )} />

                <Divider textAlign='center' sx={{marginTop:'18px'}}><Typography variant='body1'><b>или</b></Typography></Divider>

                <Button 
                  variant='contained' 
                  color='primary'
                  disabled={!player.name || gameStatus === 'loading'}
                  onClick={onGameCreate}
                  style={{ marginTop:'18px'}}>
                    {gameStatus === 'loading' ? <CircularProgress color='primary'/> : 'Создать комнату'}
                </Button>

                <Typography hidden={!errorCode} variant='body1' color={Colors.Text.HIGHLIGHT_MAJOR}>{errorMessage ?? ''}</Typography>
              </FlexBox>
          </Panel>
      </PanelGroup>
    </Box>
  );
}
