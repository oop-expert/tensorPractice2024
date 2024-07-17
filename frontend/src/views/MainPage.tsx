import { Button, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';

const DESKTOP_MAIN_PANEL_MARGIN = '10vh auto 0'

export default function MainPage() {
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const {isMobile, isDesktop} = useMediaMatch();

  const navigate = useNavigate();

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(evt.target.value);

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  return (
    <PanelGroup 
      direction={isDesktop ? 'row' : 'column'} 
      margin={isMobile ? 0 : DESKTOP_MAIN_PANEL_MARGIN} 
      width={isMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN}
      gap='30px'>
        <PanelGroup direction='column'>
          <RegistrationForm username={username} onUsernameChange={onUsernameChange}/>
        </PanelGroup>

        <PanelGroup direction='column' gap='30px'>
          <MainAppBar isInternal/>

          <Panel isMatchingMobile={isMobile}>
            <h2 hidden={isMobile}>Создайте комнату или войдите в уже существующую</h2>
            <TextField
              id='code'
              label='Код игровой сессии' 
              onChange={onCodeChange}
              InputProps={(
                {
                  endAdornment: (
                    <Button
                      variant='contained'
                      color='secondary'
                      disabled={!code || !username}
                      onClick={() => navigate(`/lobby/${code}`)}>
                        Войти
                    </Button>
                  ),
                  sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
                }
              )}/>

            <Divider textAlign='center'>или</Divider>

            <Button 
              variant='contained' 
              color='primary'
              disabled={!username}
              onClick={() => navigate(`/lobby/${nanoid()}`)}>
                Создать комнату
            </Button>
        </Panel>
      </PanelGroup>
    </PanelGroup>
  );
}
