import { Box, Button, IconButton, List, TextField } from '@mui/material';
import Panel from '../components/Panel';
import LobbyUserInfo from '../components/LobbyUserInfo';
import { nanoid } from 'nanoid';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import { useHref, useNavigate, useParams } from 'react-router-dom';
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

const LOBBY_CAPACITY = 10;
const LIST_MAX_HEIGHT = '40vh';
const DESKTOP_BUTTON_GROUP_WIDTH = '70%';
const DESKTOP_SINGLE_BUTTON_WIDTH = '30%';
const LOBBY_H2_Y_MARGIN = '4px';

export default function LobbyPage() {
  const {id} = useParams();
  const lobbyUrl = useHref(`/lobby/${id}`);
  const navigate = useNavigate();

  const {isMobile, isDesktop} = useMediaMatch();

  const dispatch = useDispatch();
  const onPopupOpen = () => dispatch(openPopup());

  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);

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
      height={'80vh'}>
      <Box
        display={isMobile ? 'none' : 'flex'}
        flexDirection={!isDesktop ? 'column' : 'row'}
        justifyContent='space-between'
        alignItems='center'
        gap={1}>
          <Box 
          display='flex'
          flexDirection='row'
          gap={1}
          alignItems='center'>
            <h2 style={{margin: 0}}>Поделиться комнатой:</h2>
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

        <Box display={isMobile ? 'none' : 'block'} position='absolute' top={10} right={10}>
          <IconButton color='warning' onClick={onQuit}>
            <CloseIcon />
          </IconButton>
        </Box>

        <h2 style={{marginTop: LOBBY_H2_Y_MARGIN, marginBottom: LOBBY_H2_Y_MARGIN}}>Ожидаем участников команды</h2>

        <List style={{maxHeight: LIST_MAX_HEIGHT, overflowY: 'scroll'}}>
          {Array.from({length: LOBBY_CAPACITY}, (_v, i) => (
            <LobbyUserInfo key={nanoid()} user={i < game.players.length ? game.players[i] : undefined}/>
          ))}
        </List>

        <Box
          display='flex'
          flexDirection={!isDesktop ? 'column' : 'row'}
          gap={2}
          width={!isDesktop ? '100%' : (player.isHost ? DESKTOP_BUTTON_GROUP_WIDTH : DESKTOP_SINGLE_BUTTON_WIDTH)}
          alignSelf='center'>
            <Button disabled={player.isReady} style={{width: '100%'}} variant='contained' color='secondary' onClick={onSetReady}>Готов играть</Button>
            <Button style={{width: '100%', display: player.isHost ? 'block' : 'none'}} variant='contained' color='primary' onClick={onGameStart}>Начать</Button>
        </Box>

        <QrCodePopup 
          onLinkSave={onLinkCopy}
          onCodeSave={onCodeCopy} />
      </Panel>
    </PanelGroup>
  );
}
