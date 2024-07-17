import { Box, ListItem, Typography } from '@mui/material';
import DefaultAvatar from './DefaultAvatar';
import TestUser from '../utils/types/TestUser';
import { useMediaMatch } from '../hooks/useMobileMatch';

const LobbyAvatarValues = {
  DESKTOP_WIDTH: '10vw',
  MOBILE_WIDTH: '10vw',
  DESKTOP_MIN_WIDTH: 80,
  MOBILE_MIN_WIDTH: 50,
  DESTOP_MAX_WIDTH: 90,
  MOBILE_MAX_WIDTH: 60
};

const DefaultUser: TestUser = {
  id: '',
  username: 'Пусто',
  avatar: 'grey',
  status: '-'
}

export default function LobbyUserInfo({user=DefaultUser}: {user?: TestUser}) {
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

        <Typography>{user.username}</Typography>
      </Box>

      <Typography>{user.status}</Typography>
    </ListItem>
  );
}
