import PersonIcon from '@mui/icons-material/Person';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Avatar } from '@mui/material';

type AvatarProps = {
  color: string,
  width: number | string,
  maxWidth?: number | string,
  minWidth?: number | string,
  userId: string,
  empty?: boolean
};

export default function DefaultAvatar({color, width, maxWidth, minWidth, userId, empty=false}: AvatarProps) {
  return (
    <Avatar alt={`avatar-${userId}`} variant='circular' sx={{
      bgcolor: color, 
      maxWidth: maxWidth, 
      maxHeight: maxWidth, 
      minWidth: minWidth,
      minHeight: minWidth,
      width: width, 
      height: width
    }}>
      {!empty
      ? <PersonIcon sx={{color: 'black', width: '80%', height: '80%'}} />
      : <QuestionMarkIcon sx={{color: 'black', width: '80%', height: '80%'}} />}
    </Avatar>
  );
}
