import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Avatar } from '@mui/material';
import { Colors } from '../utils/utils';

type AvatarProps = {
  src: string,
  width: number | string,
  maxWidth?: number | string,
  minWidth?: number | string,
  userId: number,
  empty?: boolean
};

export default function DefaultAvatar({src, width, maxWidth, minWidth, userId, empty=false}: AvatarProps) {
  return (
    <Avatar alt={`avatar-${userId}`} src={src} variant='circular' sx={{
      bgcolor: empty ? 'gray' : Colors.PANEL,
      maxWidth: maxWidth, 
      maxHeight: maxWidth, 
      minWidth: minWidth,
      minHeight: minWidth,
      width: width, 
      height: width
    }}>
      <QuestionMarkIcon sx={{display: empty ? 'block' : 'none', color: 'black', width: '80%', height: '80%'}} />
    </Avatar>
  );
}
