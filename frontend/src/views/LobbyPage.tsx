import { Box, Button, IconButton, List, TextField, Typography, useMediaQuery } from '@mui/material';
import Panel from '../components/Panel';
import LobbyUserInfo from '../components/LobbyUserInfo';
import { nanoid } from 'nanoid';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { useNavigate, useParams } from 'react-router-dom';
import QrCodePopup from '../components/QrCodePopup';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PanelGroup from '../components/PanelGroup';
import { useMediaMatch } from '../hooks/useMobileMatch';
import CloseIcon from '@mui/icons-material/Close';
import { openPopup } from '../store/popupSlice';
import { useSelector } from 'react-redux';
import { getGameById, selectGame } from '../store/gameSlice';
import { selectPlayer, setReady } from '../store/playerSlice';
import Player from '../utils/types/Player';
import { useEffect, useMemo } from 'react';
import { WebSocketActionTypes } from '../store/webSocketMiddleware';
import { useAppDispatch } from '../store/storeHooks';
import PopupRegistrationForm from '../components/PopupRegistrationForm';
import ErrorMessage from '../components/ErrorMessage';

const LOBBY_CAPACITY = 10;
const DESKTOP_BUTTON_GROUP_WIDTH = '70%';
const DESKTOP_SINGLE_BUTTON_WIDTH = '30%';
const LOBBY_H2_Y_MARGIN = '4px';

export default function LobbyPage() {
  const {id} = useParams();
  const lobbyUrl = window.location.href;
  const navigate = useNavigate();

  const {isMobile, isDesktop} = useMediaMatch();
  const isThinnerThan1000 = useMediaQuery('(max-width:1000px)');

  const dispatch = useAppDispatch();
  const onPopupOpen = () => dispatch(openPopup());

  const {game} = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  const isStartDisabled = player.isHost && game.players.every((p: Player) => p.isReady);

  const isPlayerConnected = useMemo(() => game.players.some((p) => p.name === player.name), [game, player]);
  const canJoinGame = game.id > 0 && !game.is_started && player.id > 0 && !isPlayerConnected;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onLinkCopy = () => copyToClipboard(lobbyUrl);
  const onCodeCopy = () => copyToClipboard(game.code);

  const onSetReady = () => {
    dispatch(setReady());
    dispatch({type: WebSocketActionTypes.CHANGE_STATUS, payload: {gameCode: game.id, username: player.name}});
  };

  const onGameStart = () => {
    dispatch({type: WebSocketActionTypes.START_GAME, payload: {gameCode: game.id, username: player.name}});
  };

  const onQuit = () => {
    dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.id, username: player.name}});
    navigate('/');
  };

  useEffect(() => {
    if(game.id <= 0) {
      const parsedId = parseInt(id ?? '');
      dispatch(getGameById(parsedId));
    } else if(canJoinGame) {
      dispatch({type: WebSocketActionTypes.JOIN_GAME, payload: {gameCode: game.code, username: player.name}});
    }
  }, [game, player.name, player.id, dispatch, id, canJoinGame]);

  useEffect(() => {
    if(game.is_started && isPlayerConnected) {
      navigate(`/room/${id}`);
    }
  }, [game.is_started, isPlayerConnected, id, navigate])

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
            <IconButton color='warning' onClick={onQuit}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant='h2' sx={{marginTop: LOBBY_H2_Y_MARGIN, marginBottom: LOBBY_H2_Y_MARGIN}}>Ожидаем участников команды</Typography>

          <List style={{height: 'stretch', overflowY: 'scroll'}}>
            {Array.from({length: LOBBY_CAPACITY}, (_v, i) => (
              <LobbyUserInfo key={nanoid()} user={i < game.players.length ? game.players[i] : undefined}/>
            ))}
          </List>

          <Box
            
            display='flex'
            flexDirection={isMobile ? 'column' : 'row'}
            gap={2}
            width={!isDesktop ? (isMobile ? '100%': '90%') : (player.isHost ? DESKTOP_BUTTON_GROUP_WIDTH : DESKTOP_SINGLE_BUTTON_WIDTH)}
            alignSelf='center'>
              <Button 
                disabled={player.isReady} 
                style={{width: '100%'}} 
                variant='contained' 
                color='secondary' 
                onClick={onSetReady}>
                  Готов играть
              </Button>
              <Button 
                disabled={!isStartDisabled}
                style={{width: '100%', display: player.isHost ? 'block' : 'none'}} 
                variant='contained' 
                color='primary' 
                onClick={onGameStart}>
                  Начать
              </Button>
          </Box>
      </Panel>
      <QrCodePopup 
        qrCode={game.qr_code}
        onLinkSave={onLinkCopy}
        onCodeSave={onCodeCopy} />
      
      {game.is_started
      ? <PopupRegistrationForm canJoin={game.id >= 0}/>
      : <ErrorMessage isOpened={!isPlayerConnected}/>}
    </PanelGroup>
  );
}
