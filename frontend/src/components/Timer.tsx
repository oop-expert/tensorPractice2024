import { AvatarGroup, Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { selectGame } from "../store/gameSlice";
import Question from "../utils/types/Question";
import { useNavigate, useParams } from "react-router-dom";
import { patchAnswer, resetAnswerStatus, selectPlayer } from "../store/playerSlice";
import { useMediaMatch } from "../hooks/useMobileMatch";
import { useAppDispatch } from "../store/storeHooks";
import Answer from "../utils/types/Answer";
import { GridRowsValues, MAX_PLAYERS } from "../utils/utils";
import FlexBox from "./FlexBox";
import Countdown from "./Countdown";
import QuestionImage from "./QuestionImage";
import Panel from "./Panel";
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

  const {isMobile, isVerticalTablet} = useMediaMatch();

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
      }, 10000)
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

    dispatch(patchAnswer(answer));
  }
  
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

      {isMobile || isVerticalTablet 
      ? <Panel isMatchingMobile gap='1vh'>
          <Countdown minutes={minutes} seconds={seconds}/>
          <QuestionImage question={question}/>

          <FlexBox direction='row' sx={{justifyContent: 'space-between'}} padding='0 2vw'>
            <Typography variant='body1' style={{textAlign: 'left'}}>{`Раунд: ${count} из ${MAX_PLAYERS}`}</Typography>

            <AvatarGroup variant='circular' max={4} hidden={!game.players.length}>
              {game.players.map((p) => (
                <DefaultAvatar key={p.id} userId={p.id} src={p.avatar} width={'6vh'}/>
              ))}
            </AvatarGroup>
          </FlexBox>

          <FlexBox direction='column' gap={1}>
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
              style={{width: isMobile ? '60%' : '100%'}}
              disabled={isInputDisabled || !filmAnswer}
              onClick={onAnswerSend}>
                {answerStatus === 'loading' ? <CircularProgress color='primary' /> : 'Проверить'}
            </Button>
          </FlexBox>
          
        </Panel>
      : <Grid container justifyContent='space-between' columns={12}>
        <Grid item container md={8} direction='column' paddingRight='2vh'>
          <Grid item height={GridRowsValues.UPPER_HEIGHT} padding={'1.5vh'} marginBottom={GridRowsValues.GAP}>
            <Countdown minutes={minutes} seconds={seconds} />
          </Grid>

          <Grid item height={GridRowsValues.MIDDLE_HEIGHT}>
            <QuestionImage question={question}/>
          </Grid>

          <Grid item height={GridRowsValues.DOWN_HEIGHT} alignContent='flex-end'>
            <TextField 
              id='answer'
              value={filmAnswer}
              color={fieldColor}
              disabled={isInputDisabled}
              placeholder='Введите Ваш ответ'
              helperText={answerStatus === 'error' ? 'Не получилось отправить ответ' : ''}
              style={{width: '100%'}}
              onChange={onFilmNameChange} />
          </Grid>
        </Grid>

        <Grid item container md={4} direction='column' gap={GridRowsValues.GAP}>
          <Grid item height={GridRowsValues.UPPER_HEIGHT} alignContent='flex-end'>
            <Typography variant='h3' style={{textAlign: 'right'}}>{`Раунд: ${count} из ${MAX_PLAYERS}`}</Typography>
          </Grid>

          <Grid item height={GridRowsValues.MIDDLE_AND_DOWN} alignContent='flex-end'>
            <Button 
              variant='contained' 
              color='primary' 
              disabled={isInputDisabled || !filmAnswer}
              style={{width: '100%'}} 
              onClick={onAnswerSend}>
                {answerStatus === 'loading' ? <CircularProgress color='primary' /> : 'Проверить'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      }
    </>
  )
}
