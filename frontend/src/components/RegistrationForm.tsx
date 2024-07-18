import { Box, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Panel from './Panel';
import DefaultAvatar from './DefaultAvatar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { generateRandomId } from '../utils/utils';

type UsernameField = {
  username: string; 
  onUsernameChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  avatar: string,
  dispatchAvatarId: (action: number) => void,
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

export default function RegistrationForm({username, onUsernameChange, avatar, dispatchAvatarId, width='100%'}: UsernameField) {
  const {isMobile} = useMediaMatch();

  return (
    <Panel isMatchingMobile={isMobile} width={width}>
      <Typography variant='h2'>
        Выберите один из предложенных аватаров и придумайте псевдоним, чтобы начать играть!
      </Typography>

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
        onChange={onUsernameChange}
      />
    </Panel>
  );
}
