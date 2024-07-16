import { Box, IconButton, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useReducer } from 'react';
import Panel from './Panel';
import DefaultAvatar from './DefaultAvatar';
import { nanoid } from 'nanoid';
import { AVATAR_BG_COLORS } from '../utils/utils';
import { useMobileMatch } from '../hooks/useMobileMatch';

type UsernameField = {
  username: string; 
  onUsernameChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  width?: number | string
}

const FormAvatarValues = {
  DESKTOP_WIDTH: '18vw',
  MOBILE_WIDTH: '50vw',
  DESTOP_MAX_WIDTH: 350,
  MOBILE_MAX_WIDTH: 250,
  DESKTOP_GAP: '24px',
  MOBILE_GAP: '2vw'
};

const colorIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATAR_BG_COLORS.length - 1
  : Math.abs(colorId + step) % AVATAR_BG_COLORS.length
);

export default function RegistrationForm({username, onUsernameChange, width='100%'}: UsernameField) {
  const [colorId, dispatchColorId] = useReducer(colorIdReducer, 0);

  const color = AVATAR_BG_COLORS[colorId];

  const isMatching = useMobileMatch();

  return (
    <Panel isMatchingMobile={isMatching} width={width}>
      <h2>
        Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
      </h2>

      <Box sx={
        {
          display: 'flex', 
          gap: isMatching ? FormAvatarValues.MOBILE_GAP : FormAvatarValues.DESKTOP_GAP, 
          alignItems: 'center', 
          marginX: 'auto'
        }
      }>
        <IconButton onClick={() => dispatchColorId(-1)}>
          <ArrowBackIosNewIcon sx={{color: 'white'}}/>
        </IconButton>

        <DefaultAvatar 
          color={color}
          width={isMatching ? FormAvatarValues.MOBILE_WIDTH : FormAvatarValues.DESKTOP_WIDTH}
          maxWidth={isMatching ? FormAvatarValues.MOBILE_MAX_WIDTH : FormAvatarValues.DESTOP_MAX_WIDTH}
          userId={nanoid()}/>

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
