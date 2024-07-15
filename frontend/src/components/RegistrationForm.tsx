import { Avatar, Box, IconButton, TextField, useMediaQuery, useTheme } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useReducer } from 'react';
import Panel from './Panel';

type UsernameField = {
  username: string; 
  onUsernameChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  width?: number | string
}

const AVATAR_BG_COLORS = ['yellow', 'springgreen', 'blue', 'deeppink'];

const colorIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATAR_BG_COLORS.length - 1
  : Math.abs(colorId + step) % AVATAR_BG_COLORS.length
);

export default function RegistrationForm({username, onUsernameChange, width='100%'}: UsernameField) {
  const [colorId, dispatchColorId] = useReducer(colorIdReducer, 0);

  const color = AVATAR_BG_COLORS[colorId];

  const theme = useTheme();
  const isMatching = useMediaQuery(theme.breakpoints.down('sm'));

  const avatarWidth = isMatching ? '50vw' : '18vw'
  const avatarMaxWidth = isMatching ? 250 : 350;
  const avatarGap = isMatching ? '2vw' : '24px'

  return (
    <Panel isMatchingMobile={isMatching} width={width}>
      <h2>
        Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
      </h2>

      <Box sx={{display: 'flex', gap: avatarGap, alignItems: 'center', marginX: 'auto'}}>
        <IconButton onClick={() => dispatchColorId(-1)}>
          <ArrowBackIosNewIcon sx={{color: 'white'}}/>
        </IconButton>

        <Avatar alt='avatar 1' variant='circular' sx={{
          bgcolor: color, 
          maxWidth: avatarMaxWidth, 
          maxHeight: avatarMaxWidth, 
          width: avatarWidth, 
          height: avatarWidth
        }}>
          <PersonIcon sx={{color: 'black', width: '80%', height: '80%'}}/>
        </Avatar>

        <IconButton onClick={() => dispatchColorId(1)}>
          <ArrowForwardIosIcon sx={{color: 'white'}}/>
        </IconButton>
      </Box>

      <TextField 
        id='username' 
        label='Введите Ваш псевдоним' 
        required
        error={!username}
        helperText={!username ? 'Это поле обязательно' : ''}
        onChange={onUsernameChange}
      />
    </Panel>
  );
}
