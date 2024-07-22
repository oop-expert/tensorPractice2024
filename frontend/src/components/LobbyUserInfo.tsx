import { Box, ListItem, Typography } from '@mui/material';
import DefaultAvatar from './DefaultAvatar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import Player from '../utils/types/Player';

const LobbyAvatarValues = {
  DESKTOP_WIDTH: '10vw',
  MOBILE_WIDTH: '10vw',
  DESKTOP_MIN_WIDTH: 80,
  MOBILE_MIN_WIDTH: 50,
  DESTOP_MAX_WIDTH: 90,
  MOBILE_MAX_WIDTH: 60
};

const DefaultPlayer: Player = {
  id: 0,
  name: 'Пусто',
  avatar: '',
  avatarId: 0,
  isHost: false,
  isReady: false,
  score: 0,
  createdAt: new Date().toString(),
  isRight: false
};

export default function LobbyUserInfo({user=DefaultPlayer}: {user?: Player}) {
  const {isMobile} = useMediaMatch();

  return (
    <ListItem alignItems='center' sx={{paddingLeft: 0}} slotProps={{root: {style: {justifyContent: 'space-between'}}}}>
      <Box
        display='flex'
        flexDirection='row'
        gap={2}
        alignItems='center'>
        <DefaultAvatar 
          src={user.avatar}
          width={isMobile ? LobbyAvatarValues.MOBILE_WIDTH : LobbyAvatarValues.DESKTOP_WIDTH}
          maxWidth={isMobile ? LobbyAvatarValues.MOBILE_MAX_WIDTH : LobbyAvatarValues.DESTOP_MAX_WIDTH}
          minWidth={isMobile ? LobbyAvatarValues.MOBILE_MIN_WIDTH : LobbyAvatarValues.DESKTOP_MIN_WIDTH}
          userId={user.id}
          empty={!user.id}/>

        <Typography variant='body1'>{user.name}</Typography>
      </Box>

      <Typography variant='body1'>{user.isReady ? 'Готов' : 'Не готов'}</Typography>
    </ListItem>
  );
}
