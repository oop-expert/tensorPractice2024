import { Box, Button, CardMedia, Container, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectGame } from "../store/gameSlice";
import Question from "../utils/types/Question";
import { useNavigate, useParams } from "react-router-dom";
import { patchAnswer } from "../store/playerSlice";
import { useMediaMatch } from "../hooks/useMobileMatch";
import { useAppDispatch } from "../store/storeHooks";
import Player from "../utils/types/Player";
type QwestionProps={
  qwestion:Question;
  player:Player
}
let count: number = 1
let COUNTDOWN_INITIAL_TIME_IN_SECONDS = 30
export let gameQwestion: Question
export default function Timer( {qwestion, player}:QwestionProps) {
  const navigate = useNavigate();
  const urlParams = useParams();
  const [secondsAmount, setSecondsAmount] = useState(COUNTDOWN_INITIAL_TIME_IN_SECONDS)
  const {game} = useSelector(selectGame);
  const [open, setOpen] = useState(false);
  const [filmAnswer, setFilm] = useState<string>('');
  const onFilmNameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilm(evt.target.value);
  const {isMobile} = useMediaMatch();
  const dispatch = useAppDispatch();
  //qwestion = game.questions[count-1]
  useEffect(() => {    
    if (secondsAmount == 0) {
      setOpen(true);
      setTimeout(() => {
        count = count + 1;
        setOpen(false);
        setSecondsAmount(30);
        //qwestion = game.questions[count-1];
        console.log('timout',count, qwestion);
        if (count===11){
          navigate(`/results/${Number(urlParams.id)}`)
        }
      }, 10000)
      return;
    }
 
    setTimeout(() => {
      setSecondsAmount(state => state - 1);
    }, 1000)
  }, [secondsAmount]);

  
  qwestion = game.questions[count-1];
  console.log(count, qwestion)
  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;
  //qwestion = game.questions[count-1];
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSubmit = () => {
    dispatch(patchAnswer(
      {player_id: player.id,
      player_answer: filmAnswer,
      question_id: qwestion.id,
      seconds: seconds}
    ))   
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
  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" sx={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center'}}>
          <DialogTitle id="alert-dialog-title" sx={{display:'flex', justifyContent:'center', paddingBottom:'0', fontSize:'24px'}}>
          {"Правильный ответ:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{whiteSpace: 'pre-line',textAlign:'center', color:"black", fontSize:'22px'}}>
            {qwestion.answer}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Box>
            <Button
              variant='text'
              onClick={handleClickOpen}>
                Показать правильный ответ
            </Button>
          </Box>
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Box sx={{fontSize:'2.5vh', fontWeight:500, border:'3px solid #F49C1E', color:'#F49C1E', borderRadius:'30px', width:'15vh'}}>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </Box>
    </Box>
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
          <Typography>Название какого фильма изобразил ИИ?</Typography>
          <Typography>{qwestion.answer}</Typography>
          <CardMedia sx={{height:'40vh', width:'40vh', borderRadius:'2vh', marginBottom:'2vh'}}
            id='img1'
            component="img"
            alt="Сгенерированное изображение"
            //image={game.questions[0].image}
            image="https://images.unsplash.com/photo-1518756131217-31eb79b20e8f"
            onMouseOver={ZoomImg}
            onMouseOut={UnzoomImg}>
          </CardMedia>
          <Typography>Раунд {count} из 10</Typography>
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
              type='submit'
              onClick={handleSubmit}>
                Ответить
            </Button>
          </Stack>
      </Container>
    </>
  )
}
