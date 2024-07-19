import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from 'react-redux';
import { selectGame } from '../store/gameSlice';
import { selectPlayer } from '../store/playerSlice';


export default function RoomPage() {
  const {game} = useSelector(selectGame);
  const player = useSelector(selectPlayer)
  const {isMobile} = useMediaMatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseExit = () => {
    setOpen(false);
    navigate(`/lobby/${Number(urlParams.id)}`);
  }

  return(
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" sx={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center'}}>
        <DialogTitle id="alert-dialog-title" sx={{display:'flex', justifyContent:'center'}}>
          {"Покинуть комнату?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{whiteSpace: 'pre-line',textAlign:'center'}}>
          Внимание! Если вы выйдете из игры во время текущего раунда, вам не будет разрешено вернуться.{'\n'}
          Вы уверены, что хотите выйти?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', flexDirection:'column', gap:1}}>
          <Button variant='contained' color="secondary" onClick={handleCloseExit}>Выйти</Button>
          <Button variant='contained' onClick={handleClose}>
            Вернуться в игру
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth='lg' sx={{paddingY: '0.5vw', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <Container maxWidth='md' sx={{display: 'flex',padding: '0vw', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '1vw'}}>
            <Avatar alt='avatar 1' src={player.avatar} variant='circular' sx={{width: '10vh', height: '10vh', marginRight: '1vh'}} >
              <PersonIcon sx={{color: 'black', width: '5vh', height: '5vh'}}/>
            </Avatar>
            <Typography sx={{fontWeight:'500', fontSize:'2.5vh'}}>{player.name}</Typography>
          </Box>
          <Box display={isMobile ? 'none' : 'flex'}>
            <Button
              variant='contained'
              onClick={handleClickOpen}>
                Выйти
            </Button>
          </Box>
        </Container>
        <Timer qwestion={game.questions[0]} player={player}/>
      </Container>
    </>
  );
}
