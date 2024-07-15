import { Button, Divider, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import PanelGroup from '../components/PanelGroup';
import Panel from '../components/Panel';
import MainAppBar from '../components/MainAppBar';

export default function MainPage() {
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const theme = useTheme();
  const isMatching = useMediaQuery(theme.breakpoints.down('sm'));

  const navigate = useNavigate();

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(evt.target.value);

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  return (
    <PanelGroup direction={isMatching ? 'column' : 'row'} margin={isMatching ? '0' : '15vh 0 0'}>
        <PanelGroup direction='column'>
          <RegistrationForm username={username} onUsernameChange={onUsernameChange}/>
        </PanelGroup>

        <PanelGroup direction='column'>
          {isMatching ? <></> : <MainAppBar isOnMainPage/>}

          <Panel isMatchingMobile={isMatching}>
            <h2>Создайте комнату или войдите в уже существующую</h2>
            <TextField
              id='code'
              label='Код игровой сессии' 
              onChange={onCodeChange}
              InputProps={(
                {
                  endAdornment: (
                    <Button
                      variant='contained'
                      disabled={!code || !username}
                      onClick={() => navigate(`/lobby/${code}`)}
                      >
                        Войти
                    </Button>
                  ),
                  sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
                }
              )}
              />

            <Divider textAlign='center'>или</Divider>

            <Button 
              variant='contained' 
              disabled={!username}
              onClick={() => navigate(`/lobby/${nanoid()}`)}>
                Создать комнату
            </Button>
        </Panel>
      </PanelGroup>
    </PanelGroup>
  );
}
