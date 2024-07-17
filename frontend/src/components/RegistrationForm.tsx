import { Box, IconButton, TextField } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useReducer } from 'react';
import Panel from './Panel';
import DefaultAvatar from './DefaultAvatar';
import { nanoid } from 'nanoid';
import { AVATARS } from '../utils/utils';
import { useMediaMatch } from '../hooks/useMobileMatch';

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
  ? AVATARS.length - 1
  : Math.abs(colorId + step) % AVATARS.length
);

export default function RegistrationForm({username, onUsernameChange, width='100%'}: UsernameField) {
  const [avatarId, dispatchAvatarId] = useReducer(colorIdReducer, 0);

  const avatar = AVATARS[avatarId];

  const {isMobile} = useMediaMatch();

  return (
    <Panel isMatchingMobile={isMobile} width={width}>
      <h2>
        Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
      </h2>

      <Box sx={
        {
          display: 'flex', 
          gap: isMobile ? FormAvatarValues.MOBILE_GAP : FormAvatarValues.DESKTOP_GAP, 
          alignItems: 'center', 
          marginX: 'auto'
        }
      }>
        <IconButton color='primary' onClick={() => dispatchAvatarId(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <DefaultAvatar 
          src={avatar}
          width={isMobile ? FormAvatarValues.MOBILE_WIDTH : FormAvatarValues.DESKTOP_WIDTH}
          maxWidth={isMobile ? FormAvatarValues.MOBILE_MAX_WIDTH : FormAvatarValues.DESTOP_MAX_WIDTH}
          userId={nanoid()}/>

        <IconButton color='primary' onClick={() => dispatchAvatarId(1)}>
          <ArrowForwardIosIcon />
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
