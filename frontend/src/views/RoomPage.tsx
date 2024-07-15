import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';

export default function RoomPage({name}: {name: string},{color}: {color: string}) {
  const [film, setFilm] = useState<string>('');
    const navigate = useNavigate();
    const urlParams = useParams();
    const onFilmNameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilm(evt.target.value);
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
        aria-describedby="alert-dialog-description" sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <DialogTitle id="alert-dialog-title">
          {"Покинуть комнату?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{whiteSpace: 'pre-line',textAlign:'center'}}>
          Внимание! Если вы выйдете из игры во время текущего раунда, вам не будет разрешено вернуться.{'\n'}
          Вы уверены, что хотите выйти?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display:'flex', flexDirection:'column', gap:1}}>
          <Button onClick={handleCloseExit}>Выйти</Button>
          <Button onClick={handleClose}>
            Вернуться в игру
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth='lg' sx={{bgcolor: 'white', padding: '2vw', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <Container maxWidth='md' sx={{display: 'flex',padding: '0vw', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '1vw'}}>
            <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '10vh', height: '10vh', marginRight: '1vh'}} >
              <PersonIcon sx={{color: 'black', width: '5vh', height: '5vh'}}/>
            </Avatar>
            <p>{name}</p>
          </Box>
          <Button
            variant='contained'
            onClick={handleClickOpen}>
              Выйти
          </Button>
        </Container>
        <Timer/>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <h4>Название какого фильма изобразил ИИ?</h4>
          <img src="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f" alt='Сгенерированное изображение' width={250} height={250}/>
          <p>Раунд 1 из 10</p>
        </Box>
        
        <Container maxWidth='md' sx={{display: 'flex', flexDirection: 'column', paddingTop:'10px', gap: 1}}>
          <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center', gap: 1}}>
            <TextField 
              id='answer' 
              label='Введите ваш ответ' 
              variant='filled' 
              required 
              color='primary' 
              error={!film}
              helperText={!film ? 'Это поле обязательно' : ''}
              onChange={onFilmNameChange}
            />
            <Button
              variant='contained'
              onClick={() => navigate(`/results/${Number(urlParams.id)}`)}>
                Ответить
            </Button>
          </Box>
      </Container>
    </Container>
    </>
    );
}
