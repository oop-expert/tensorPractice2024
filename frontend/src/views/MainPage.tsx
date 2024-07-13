import { Button, Container, Divider, TextField } from '@mui/material';
import { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function MainPage() {
  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const navigate = useNavigate();

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(evt.target.value);

  const onCodeChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setCode(evt.target.value);

  return (
    <Container maxWidth='lg' sx={{padding: 5, borderRadius: 5, display: 'flex', flexDirection: 'column', gap: 5}}>
      <RegistrationForm username={username} onUsernameChange={onUsernameChange}/>
      
      <Container maxWidth='md' sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
        <TextField
          id='code'
          label='Код игровой сессии' 
          onChange={onCodeChange}
          InputProps={(
            {endAdornment: (
            <Button
              variant='contained'
              disabled={!code || !username}
              onClick={() => navigate(`/lobby/${code}`)}>
                Подключиться
            </Button>),
            sx: {
              borderColor: '#87898F',
              borderRadius: 50
            }}
            )}
          />

        <Divider textAlign='center'>или</Divider>

        <Button 
          variant='contained' 
          disabled={!username}
          onClick={() => navigate(`/lobby/${nanoid()}`)}>
            Создать игрову сессию
        </Button>
      </Container>
    </Container>
  );
}
