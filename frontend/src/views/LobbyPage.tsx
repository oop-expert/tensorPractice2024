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
import { useDispatch, useSelector } from 'react-redux';
import { changePlayer, quitGame, selectGame, startGame } from '../store/gameSlice';
import { selectPlayer, setReady } from '../store/playerSlice';
import Player from '../utils/types/Player';

const LOBBY_CAPACITY = 10;
const LIST_MAX_HEIGHT = '40vh';
const DESKTOP_BUTTON_GROUP_WIDTH = '70%';
const DESKTOP_SINGLE_BUTTON_WIDTH = '30%';
const LOBBY_H2_Y_MARGIN = '4px';

export default function LobbyPage() {
  const {id} = useParams();
  const lobbyUrl = window.location.href;
  const navigate = useNavigate();

  const {isMobile, isDesktop} = useMediaMatch();
  const isThinnerThan1000 = useMediaQuery('(max-width:1000px)');
  const isShorterThan700 = useMediaQuery('(max-height:700px)');

  const dispatch = useDispatch();
  const onPopupOpen = () => dispatch(openPopup());

  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

  const isStartDisabled = player.isHost && game.players.every((p: Player) => p.isReady);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onLinkCopy = () => copyToClipboard(lobbyUrl);
  const onCodeCopy = () => copyToClipboard(game.code);

  const onSetReady = () => {
    dispatch(setReady());
    dispatch(changePlayer(player.id));
  };

  const onGameStart = () => {
    dispatch(startGame());
    navigate(`/room/${id}`)
  };

  const onQuit = () => {
    dispatch(quitGame());
    navigate('/');
  };

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
        padding={5}> 
          <Box display={isMobile ? 'none' : 'block'} position='absolute' top={20} right={20}>
            <IconButton color='warning' onClick={onQuit}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant='h2' sx={{marginTop: LOBBY_H2_Y_MARGIN, marginBottom: LOBBY_H2_Y_MARGIN}}>Ожидаем участников команды</Typography>

          <List style={{height: '80%', maxHeight: LIST_MAX_HEIGHT, overflowY: 'scroll'}}>
            {Array.from({length: LOBBY_CAPACITY}, (_v, i) => (
              <LobbyUserInfo key={nanoid()} user={i < game.players.length ? game.players[i] : undefined}/>
            ))}
          </List>

          <Box
            position='absolute'
            bottom={isMobile ? '0' : (isShorterThan700 ? '2vh' : '5vh')}
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
        onLinkSave={onLinkCopy}
        onCodeSave={onCodeCopy} />
    </PanelGroup>
  );
}
