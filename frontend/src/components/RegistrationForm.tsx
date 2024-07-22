import { Box, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Panel from './Panel';
import DefaultAvatar from './DefaultAvatar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { AVATARS, generateRandomId } from '../utils/utils';
import { useEffect, useReducer, useState } from 'react';
import { setInfo } from '../store/playerSlice';
import { useAppDispatch } from '../store/storeHooks';

const FormAvatarValues = {
  DESKTOP_WIDTH: '18vw',
  MOBILE_WIDTH: '50vw',
  DESTOP_MAX_WIDTH: 350,
  MOBILE_MAX_WIDTH: 250,
  DESKTOP_GAP: '24px',
  MOBILE_GAP: '2vw'
};

const avatarIdReducer = (colorId: number, step: number): number => (
  colorId + step < 0 
  ? AVATARS.length - 1
  : Math.abs(colorId + step) % AVATARS.length
);

export default function RegistrationForm({width='100%', padding=5}: {width?: number | string, padding?: number | string}) {
  const {isMobile} = useMediaMatch();

  const dispatch = useAppDispatch();

  const [avatarId, dispatchAvatarId] = useReducer(avatarIdReducer, 0);
  const [username, setUsername] = useState<string>('');

  const avatar = AVATARS[avatarId];

  const onUsernameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setUsername(evt.target.value);

  useEffect(() => {
    if(username) {
      dispatch(setInfo({name: username, avatarId}));
    }
  }, [username, avatarId, dispatch]);

  return (
    <Panel isMatchingMobile={isMobile} width={width} padding={padding} gap={isMobile ? '5vh' : 2}>
      <Typography variant='h2'>
        Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
      </Typography>

      <Box 
        sx={{
          display: 'flex', 
          gap: isMobile ? FormAvatarValues.MOBILE_GAP : FormAvatarValues.DESKTOP_GAP, 
          alignItems: 'center', 
          marginX: 'auto'
        }}>
        <IconButton color='primary' onClick={() => dispatchAvatarId(-1)}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <DefaultAvatar 
          src={avatar}
          width={isMobile ? FormAvatarValues.MOBILE_WIDTH : FormAvatarValues.DESKTOP_WIDTH}
          maxWidth={isMobile ? FormAvatarValues.MOBILE_MAX_WIDTH : FormAvatarValues.DESTOP_MAX_WIDTH}
          userId={generateRandomId()}/>

        <IconButton color='primary' onClick={() => dispatchAvatarId(1)}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <TextField 
        id='username' 
        placeholder='Введите Ваш псевдоним' 
        required
        error={!username}
        helperText={!username ? 'Это поле обязательно' : ''}
        onChange={onUsernameChange}/>
    </Panel>
  );
}
