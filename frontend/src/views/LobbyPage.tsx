import { Box, Button, CircularProgress, IconButton, List, TextField, Typography, useMediaQuery } from '@mui/material';
import Panel from '../components/Panel';
import LobbyUserInfo from '../components/LobbyUserInfo';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import QrCodePopup from '../components/QrCodePopup';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PanelGroup from '../components/PanelGroup';
import { useMediaMatch } from '../hooks/useMobileMatch';
import CloseIcon from '@mui/icons-material/Close';
import { openQrPopup, openQuitPopup } from '../store/popupSlice';
import { useSelector } from 'react-redux';
import { getGameByCode, selectGame } from '../store/gameSlice';
import { selectPlayer, setReady } from '../store/playerSlice';
import Player from '../utils/types/Player';
import { useEffect, useMemo, useRef, useState } from 'react';
import { WebSocketActionTypes } from '../store/webSocketMiddleware';
import { useAppDispatch } from '../store/storeHooks';
import PopupRegistrationForm from '../components/PopupRegistrationForm';
import ErrorMessage from '../components/ErrorMessage';
import LoadingPopup from '../components/LoadingPopup';
import QuitGamePopup from '../components/QuitGamePopup';

const DESKTOP_BUTTON_GROUP_WIDTH = '70%';
const DESKTOP_SINGLE_BUTTON_WIDTH = '30%';
const LOBBY_H2_Y_MARGIN = '4px';

export default function LobbyPage() {
  const {code} = useParams();
  const lobbyUrl = window.location.href;
  const navigate = useNavigate();

  const {isMobile, isDesktop, isXL} = useMediaMatch();
  const isThinnerThan1000 = useMediaQuery('(max-width:1000px)');

  const dispatch = useAppDispatch();
  const onPopupOpen = () => dispatch(openQrPopup());

  const {game} = useSelector(selectGame);
  const {player} = useSelector(selectPlayer);

  const isPlayerConnected = useMemo(() => game.players.some((p) => p.name === player.name), [game, player]);
  const canJoinGame = game.id > 0 && !game.is_started && player.id > 0 && !isPlayerConnected;

  const hasAllImages = useMemo(() => game.questions.every((q) => q.image), [game]);
  const isStartDisabled = useMemo(() => player.isHost && !game.players.every((p: Player) => p.isReady) || game.is_started && !hasAllImages, 
    [game, player, hasAllImages]);

  const [countdown, setCountdown] = useState<number>(0);

  const linkRef = useRef<HTMLTextAreaElement>(null);

  const listMargin = isXL ? '100px' : (isMobile && player.isHost ? '140px' : '70px');

  const copyToClipboard = (text: string) => {
    if(window.isSecureContext) {
      navigator.clipboard.writeText(text);
    } else if(linkRef.current) {
      linkRef.current.hidden = false;
      linkRef.current.select();

      try {
        document.execCommand('copy');
      } catch(err) {
        console.error(err);
      } finally {
        linkRef.current.hidden = true;
      }
    }
  };

  const onLinkCopy = () => copyToClipboard(lobbyUrl);
  const onCodeCopy = () => copyToClipboard(game.code);

  const onSetReady = () => {
    dispatch(setReady());
    dispatch({type: WebSocketActionTypes.CHANGE_STATUS, payload: {gameCode: game.id, username: player.name, avatarId: player.avatarId}});
  };

  const onGameStart = () => {
    dispatch({type: WebSocketActionTypes.START_GAME, payload: {gameCode: game.id, username: player.name, avatarId: player.avatarId}});
  };

  const onQuit = () => {
    dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.id, username: player.name, avatarId: player.avatarId}});
    navigate('/');
  };

  const onQuitOpen = () => {
    dispatch(openQuitPopup(false));
  };

  useEffect(() => {
    if(game.id <= 0 && code) {
      dispatch(getGameByCode(code));
    }
  }, [game, player, dispatch, code, canJoinGame]);

  useEffect(() => {
    if(isPlayerConnected) {
      return;
    } else if(canJoinGame) {
      dispatch({type: WebSocketActionTypes.JOIN_GAME, payload: {gameCode: game.code, username: player.name, avatarId: player.avatarId}});
    }
  });

  useEffect(() => {
    if(game.is_started && hasAllImages && isPlayerConnected) {
      navigate(`/room/${code}`);
    }
  }, [game.is_started, isPlayerConnected, code, navigate, hasAllImages])

  useEffect(() => {
    if(isPlayerConnected && !hasAllImages) {
      if(countdown === 0) {
        dispatch(getGameByCode(game.code));
        setCountdown(10000);
      } else {
        setTimeout(() => {
          setCountdown(0);
        }, 10000);
      }
    } else {
      return;
    }
  }, [game.code, isPlayerConnected, countdown, hasAllImages, dispatch]);

  return (
    <PanelGroup 
      direction='column' 
      width={isMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN} 
      margin={'0 auto'}
      gap={1}
      height={isMobile ? '85vh' : '80vh'}>
      <Box
        display={isMobile ? 'none' : 'flex'}
        flexDirection={isThinnerThan1000 ? 'column' : 'row'}
        justifyContent='space-between'
        alignItems='center'
        gap={1}>
          <Box 
          display='flex'
          flexDirection='row'
          gap={1}
          alignItems='center'>
            <Typography variant='h2' sx={{margin: 0}}>Поделиться комнатой:</Typography>
            <IconButton color='primary' onClick={onPopupOpen}>
              <QrCode2Icon />
            </IconButton>

            <IconButton color='secondary' onClick={onLinkCopy}>
              <InsertLinkIcon />
            </IconButton>
          </Box>

          <TextField
            id='code'
            value={game.code}
            aria-readonly
            InputProps={(
              {
                disableUnderline: true,
                endAdornment: (
                  <IconButton color='secondary' onClick={onCodeCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                ),
                sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
              }
            )}/>
      </Box>
      <Panel
        position='relative'
        isMatchingMobile={isMobile} 
        margin={'0 auto'}
        padding={5}
        height={isMobile ? '100%' : '60vh'}> 
          <Box display={isMobile ? 'none' : 'block'} position='absolute' top={20} right={20}>
            <IconButton color='warning' onClick={onQuitOpen}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant='h2' sx={{marginTop: LOBBY_H2_Y_MARGIN, marginBottom: LOBBY_H2_Y_MARGIN}}>
            {game.is_started && !hasAllImages ? 'Генерируются изображения' : 'Ожидаем участников команды'}
          </Typography>

            <List style={{height: 'stretch', marginBottom: listMargin, overflowY: 'auto'}}>
              {game.players.map((p) => (
                <LobbyUserInfo key={p.id} user={p}/>
              ))}
            </List>

          <Box 
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}
            position='absolute'
            bottom={isMobile ? '1.5vh' : '5vh'}
            gap={2}
            alignItems='center'
            width={!isDesktop ? (isMobile ? '100%': '90%') : (player.isHost ? DESKTOP_BUTTON_GROUP_WIDTH : DESKTOP_SINGLE_BUTTON_WIDTH)}
            alignSelf='center'>
              <Button 
                disabled={game.is_started} 
                style={{width: isMobile ? '60%' : '100%'}} 
                variant='contained' 
                color='secondary' 
                onClick={onSetReady}>
                  {player.isReady ? 'Не готов играть' : 'Готов играть'}
              </Button>
              <Button 
                disabled={isStartDisabled}
                style={{width: isMobile ? '60%' : '100%', display: player.isHost ? 'block' : 'none'}} 
                variant='contained' 
                color='primary' 
                onClick={onGameStart}>
                  {game.is_started && !hasAllImages ? <CircularProgress color='primary'/> : 'Начать'}
              </Button>
          </Box>
      </Panel>
      <QrCodePopup 
        qrCode={game.qr_code}
        onLinkSave={onLinkCopy}
        onCodeSave={onCodeCopy} />
      
      {!game.is_started
      ? (game.players.length >= 10 && !isPlayerConnected ? <ErrorMessage isOpened message='К сожалению, лимит участников превышен'/> : <PopupRegistrationForm />)
      : <ErrorMessage isOpened={!isPlayerConnected} message='К сожалению, игра уже началась, и Вы не можете подключиться к ней'/>}

      <LoadingPopup isOpened={game.is_started && !hasAllImages && isPlayerConnected}/>

      <QuitGamePopup quitGame={onQuit}/>

      <textarea ref={linkRef} value={lobbyUrl} style={{position: 'absolute', left: '-9999999px'}} hidden readOnly></textarea>
    </PanelGroup>
  );
}
