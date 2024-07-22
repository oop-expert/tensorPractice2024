import { Button, Dialog } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import { useSelector } from 'react-redux';
import { selectPlayer, signUp } from '../store/playerSlice';
import { useAppDispatch } from '../store/storeHooks';

export default function PopupRegistrationForm({canJoin}: {canJoin: boolean}) {
  const player = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const onJoin = () => {
    dispatch(signUp(false));
  };

  return (
    <Dialog open={player.id <= 0 && canJoin}>
      <RegistrationForm />
      <Button variant='contained' color='primary' onClick={onJoin}>Подключиться</Button>
    </Dialog>
  );
}
