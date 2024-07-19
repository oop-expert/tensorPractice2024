import { Avatar, Box, Button, CardMedia, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../components/Timer';
import { useMediaMatch } from '../hooks/useMobileMatch';


export default function RoomPage({name}: {name: string},{color}: {color: string}) {
  const [film, setFilm] = useState<string>('');
  const {isMobile} = useMediaMatch();
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
  const ZoomImg = () => {
    let img = document.getElementById("img1");
    let answerFild = document.getElementById("answer");
    let answerButton = document.getElementById("answerButton");
    if(img!==null && answerFild!== null && answerButton !== null){
      answerFild.style.display = "none";
      //answerFild.style.opacity = "0";
      answerButton.style.display = "none";
      answerButton.style.pointerEvents = "none";
      img.style.width = "50%";
      img.style.transform = "scale(2)";
      img.style.transition = "transform 0.25s ease";
     
  }}
  const UnzoomImg = () => {
    let img = document.getElementById("img1");
    let answerFild = document.getElementById("answer");
    let answerButton = document.getElementById("answerButton");
    if(img!==null && answerFild!== null && answerButton !== null){
      answerFild.style.display = "";
      answerButton.style.display = "";
      answerButton.style.pointerEvents = "auto";
      img.style.width = "40vh";
      answerButton.style.transition = "transform 0.25s ease";
      img.style.transform = "scale(1)";
      img.style.transition = "transform 0.25s ease";
        
  }}

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
          <Button variant='contained' color='secondary' onClick={handleCloseExit}>Выйти</Button>
          <Button variant='contained' onClick={handleClose}>
            Вернуться в игру
          </Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth='lg' sx={{paddingY: '0.5vw', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
        <Container maxWidth='md' sx={{display: 'flex',padding: '0vw', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '1vw'}}>
            <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '10vh', height: '10vh', marginRight: '1vh'}} >
              <PersonIcon sx={{color: 'black', width: '5vh', height: '5vh'}}/>
            </Avatar>
            <Typography sx={{fontWeight:'500', fontSize:'2.5vh'}}>{name}</Typography>
          </Box>
          <Box display={isMobile ? 'none' : 'flex'}>
            <Button
              variant='contained'
              onClick={handleClickOpen}>
                Выйти
            </Button>
          </Box>
        </Container>
        <Timer/>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <Typography>Название какого фильма изобразил ИИ?</Typography>
          <CardMedia sx={{height:'40vh', width:'40vh', borderRadius:'2vh', marginBottom:'2vh'}}
            id='img1'
            component="img"
            alt="Сгенерированное изображение"
            image="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"
            onMouseOver={ZoomImg}
            onMouseOut={UnzoomImg}>
          </CardMedia>
          <Typography>Раунд 1 из 10</Typography>
        </Box>
          
        <Container maxWidth='md' sx={{position:'absolute', bottom:'1vh', left:'50%', marginRight:'-50%', transform:'translate(-50%, -50%)', alignItems:'center', margin:'0 auto', display: 'flex', flexDirection: 'column', paddingTop:'10px', gap: 1}}>
          <Stack direction={isMobile ? 'column' : 'row'} sx={{display: 'flex', alignItems:'center', gap: 1}}>
            <TextField 
              id='answer' 
              label='Введите Ваш ответ' 
              variant='filled' 
              required
              color='primary' 
              onChange={onFilmNameChange}
            />
            <Button
              id='answerButton'
              variant='contained'
              onClick={() => navigate(`/results/${urlParams.id}`)}>
                Ответить
            </Button>
          </Stack>
        </Container>
      </Container>
    </>
  );
}
