import { Box, Button, CircularProgress, Dialog, IconButton, Typography } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import { useSelector } from 'react-redux';
import { selectPlayer, signUp } from '../store/playerSlice';
import { useAppDispatch } from '../store/storeHooks';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { quitGame, selectGame } from '../store/gameSlice';
import { Colors } from '../utils/utils';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

export default function PopupRegistrationForm() {
  const navigate = useNavigate();
  const {isMobile, isDesktop} = useMediaMatch();

  const {errorCode, errorMessage, status} = useSelector(selectGame);
  const {player} = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const maxWidth = isMobile ? 'sm' : (isDesktop ? 'lg' : 'md');

  const onJoin = () => {
    dispatch(signUp(false));
  };

  const onQuit = () => {
    dispatch(quitGame());
    navigate('/');
  };

  return (
    <Dialog open={player.id <= 0 || errorCode === '4002'} maxWidth={maxWidth}>
      <Box display='flex' flexDirection='column' gap={1}>
        <Box
          position='absolute'
          top={5}
          right={5}>
          <IconButton color='warning' onClick={onQuit}>
            <CloseIcon />
          </IconButton>
        </Box>
        <RegistrationForm padding={0}/>
        <Button variant='contained' color='primary' onClick={onJoin}>
          {status === 'loading' ? <CircularProgress color='primary'/> : 'Подключиться'}
        </Button>
        <Typography hidden={!errorCode} variant='h2' color={Colors.ErrorInput.OUTLINE}>{errorMessage ?? ''}</Typography>
      </Box>
    </Dialog>
  );
}
