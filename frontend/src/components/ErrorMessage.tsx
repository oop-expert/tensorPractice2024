import { Button, Dialog, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/storeHooks';
import { quitGame } from '../store/gameSlice';

export default function ErrorMessage({isOpened}: {isOpened: boolean}) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const onReturn = () => {
    dispatch(quitGame());
    navigate('/');
  };

  return (
    <Dialog open={isOpened}>
      <Typography variant='h2'>К сожалению, игра уже началась, и Вы не можете подключиться к ней</Typography>
      <Button variant='contained' color='primary' onClick={onReturn}>Главное меню</Button>
    </Dialog>
  );
}
