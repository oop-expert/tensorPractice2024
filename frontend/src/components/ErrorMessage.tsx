import { Button, Dialog, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/storeHooks';
import { quitGame } from '../store/gameSlice';

export default function ErrorMessage({isOpened, message}: {isOpened: boolean, message: string}) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onReturn = () => {
    dispatch(quitGame());
    navigate('/');
  };

  return (
    <Dialog open={isOpened}>
      <Typography variant='h2'>{message}</Typography>
      <Button variant='contained' color='primary' onClick={onReturn}>Перейти на главный экран</Button>
    </Dialog>
  );
}
