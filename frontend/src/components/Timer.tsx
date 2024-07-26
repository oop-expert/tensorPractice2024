import { AvatarGroup, Box, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectGame } from "../store/gameSlice";
import Question from "../utils/types/Question";
import { useNavigate, useParams } from "react-router-dom";
import { patchAnswer, resetAnswerStatus, selectPlayer } from "../store/playerSlice";
import { useMediaMatch } from "../hooks/useMobileMatch";
import { useAppDispatch } from "../store/storeHooks";
import Answer from "../utils/types/Answer";
import { MAX_PLAYERS } from "../utils/utils";
import FlexBox from "./FlexBox";
import Countdown from "./Countdown";
import QuestionImage from "./QuestionImage";
import DefaultAvatar from "./DefaultAvatar";
import PlayerState from "../utils/types/PlayerState";

const getFieldColor = (status: PlayerState['answerStatus']) => {
  switch (status) {
    case 'loading': 
      return 'info';
    case 'success':
      return 'success';
    case 'incorrect':
      return 'error';
    default:
      return 'primary';
  }
};

const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 60

export default function Timer() {
  const navigate = useNavigate();
  const urlParams = useParams();

  const {game} = useSelector(selectGame);
  const {player, answerStatus} = useSelector(selectPlayer);
  const dispatch = useAppDispatch();

  const [secondsAmount, setSecondsAmount] = useState(COUNTDOWN_INITIAL_TIME_IN_SECONDS);
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);
  const [filmAnswer, setFilm] = useState<string>('');

  const {isMobile} = useMediaMatch();

  const question: Question = game.questions[count - 1];

  const fieldColor = getFieldColor(answerStatus);
  console.log(answerStatus);
  const isInputDisabled = answerStatus === 'success' || answerStatus === 'incorrect' || answerStatus === 'loading';

  const onFilmNameChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilm(evt.target.value);

  useEffect(() => {
    if (secondsAmount == 0) {
      setOpen(true);
      setTimeout(() => {
        setCount((value) => value + 1);
        setOpen(false);
        setSecondsAmount(COUNTDOWN_INITIAL_TIME_IN_SECONDS);
        dispatch(resetAnswerStatus());
        setFilm('');
        if (count >= 10){
          navigate(`/results/${urlParams.code}`)
        }
      }, 5000)
      return;
    }
 
    setTimeout(() => {
      setSecondsAmount(state => state - 1);
    }, 1000)
  }, [secondsAmount]);

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  const onAnswerSend = () => {
    const answer: Answer = {
      player_id: player.id,
      player_answer: filmAnswer,
      question_id: question.id,
      seconds: seconds
    };
    //setSecondsAmount(0);
    dispatch(patchAnswer(answer));
  }
  const hiddenAnswer = question.answer.slice().replace(/[а-яёa-z0-9]/gi, '_');

  
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" sx={{display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center'}}>
          <DialogTitle id="alert-dialog-title" sx={{display:'flex', justifyContent:'center', paddingBottom:'0', fontSize:'24px'}}>
          {"Правильный ответ:"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{whiteSpace: 'pre-line',textAlign:'center', color:"black", fontSize:'22px'}}>
            {question?.answer}
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Box className='app__top-content'>
        <Countdown minutes={minutes} seconds={seconds}/>
        <QuestionImage question={question}/>


        <FlexBox direction='row' sx={{justifyContent: 'space-between', marginTop:'12px'}}>
          <Typography variant='body1' style={{textAlign: 'left'}}>{`Раунд: ${count} из ${MAX_PLAYERS}`}</Typography>

          <AvatarGroup variant='circular' max={4} hidden={!game.players.length} sx={{alignItems:'center'}}>
            {game.players.map((p) => (
              <DefaultAvatar key={p.id} userId={p.id} src={p.avatar} width={'44px'}/>
            ))}
          </AvatarGroup>
        </FlexBox>
        {(answerStatus === 'success') ?
          <Typography variant='h2' marginTop={'6px'} textAlign='center' color={'#0DC268'} alignItems='center' lineHeight={1}>{question.answer}</Typography>

          :
          <Typography variant='h2' marginTop={'6px'}  color={'#C94F48'} alignItems='center' letterSpacing={3}  lineHeight={1}>{hiddenAnswer}</Typography>

        }
        </Box>
        <FlexBox direction='column' sx={{marginTop:'18px', marginBottom:'35px', width:'100%'}}>
            <TextField 
              id='answer'
              value={filmAnswer}
              color={fieldColor}
              disabled={isInputDisabled}
              placeholder='Введите Ваш ответ'
              helperText={answerStatus === 'error' ? 'Не получилось отправить ответ' : ''}
              style={{width: '100%'}}
              onChange={onFilmNameChange} />

            <Button 
              variant='contained' 
              color='primary' 
              style={{width: isMobile ? '60%' : '100%', marginTop:'28px'}}
              disabled={isInputDisabled || !filmAnswer}
              onClick={onAnswerSend}>
                {answerStatus === 'loading' ? <CircularProgress color='primary' /> : 'Проверить'}
            </Button>
        </FlexBox>
    </>
  )
}
