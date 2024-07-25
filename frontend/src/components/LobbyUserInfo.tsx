import { Box, ListItem, Typography } from '@mui/material';
import DefaultAvatar from './DefaultAvatar';
import { useMediaMatch } from '../hooks/useMobileMatch';
import Player from '../utils/types/Player';
import { AvatarValues } from '../utils/utils';

const DefaultPlayer: Player = {
  id: 0,
  name: 'Пусто',
  avatar: '',
  avatarId: 0,
  isHost: false,
  isReady: false,
  score: 0,
  createdAt: new Date().toString()
};

export default function LobbyUserInfo({user=DefaultPlayer}: {user?: Player}) {
  const {isMobile} = useMediaMatch();

  return (
    <ListItem alignItems='center' sx={{paddingLeft: 0, paddingTop: 0, paddingBottom:'21px'}} slotProps={{root: {style: {justifyContent: 'space-between'}}}}>
      <Box
        display='flex'
        flexDirection='row'
        gap={2}
        alignItems='center'>
        <DefaultAvatar 
          src={user.avatar}
          width={isMobile ? AvatarValues.MOBILE_WIDTH : AvatarValues.DESKTOP_WIDTH}
          maxWidth={isMobile ? AvatarValues.MOBILE_MAX_WIDTH : AvatarValues.DESTOP_MAX_WIDTH}
          minWidth={isMobile ? AvatarValues.MOBILE_MIN_WIDTH : AvatarValues.DESKTOP_MIN_WIDTH}
          userId={user.id}
          empty={!user.id}/>

        <Typography variant='body1'>{user.name}</Typography>
      </Box>

      <Typography variant='body1'>{user.isReady ? 'Готов' : 'Не готов'}</Typography>
    </ListItem>
  );
}
