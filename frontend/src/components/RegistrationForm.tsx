import { Avatar, Box, Container, IconButton, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useReducer } from 'react';

type UsernameField = {
  username: string; 
  onUsernameChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const AVATAR_BG_COLORS = ['yellow', 'springgreen', 'blue', 'deeppink'];

const colorIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATAR_BG_COLORS.length - 1
  : Math.abs(colorId + step) % AVATAR_BG_COLORS.length
);

export default function RegistrationForm({username, onUsernameChange}: UsernameField) {
  const [colorId, dispatchColorId] = useReducer(colorIdReducer, 0);

  const color = AVATAR_BG_COLORS[colorId];

  return (
    <Container maxWidth='md' sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
      <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: 8}}>
        <IconButton onClick={() => dispatchColorId(-1)}>
          <ArrowBackIosNewIcon sx={{color: 'white', }}/>
        </IconButton>

        <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: 100, height: 100}} >
          <PersonIcon sx={{color: 'black', width: 75, height: 75}}/>
        </Avatar>

        <IconButton onClick={() => dispatchColorId(1)}>
          <ArrowForwardIosIcon sx={{color: 'white'}}/>
        </IconButton>
      </Box>

      <TextField 
        id='username' 
        label='Ваше имя' 
        variant='filled' 
        required 
        color='primary' 
        error={!username}
        helperText={!username ? 'Это поле обязательно' : ''}
        onChange={onUsernameChange}
      />
    </Container>
  );
}
