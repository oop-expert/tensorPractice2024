import { Box, Button, IconButton, List, TextField } from '@mui/material';
import Panel from '../components/Panel';
import LobbyUserInfo from '../components/LobbyUserInfo';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker/locale/ru';
import { AVATARS, getRandomInteger, WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import TestUser from '../utils/types/TestUser';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import QrCodePopup from '../components/QrCodePopup';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PanelGroup from '../components/PanelGroup';
import { useMediaMatch } from '../hooks/useMobileMatch';
import CloseIcon from '@mui/icons-material/Close';

const TEST = [1, 2, 3, 4, 5];
const LOBBY_CAPACITY = 10;
const LIST_MAX_HEIGHT = '40vh';
const DESKTOP_LOBBY_BUTTON_WIDTH = '70%';
const LOBBY_H2_Y_MARGIN = '4px';

const generateTestUser = (id: number): TestUser => ({
  id: `${nanoid()}${id}`,
  username: faker.person.firstName(),
  avatar: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
  status: getRandomInteger(0, 1) === 0 ? 'Не готов' : 'Готов'
});

export default function LobbyPage() {
  const {id} = useParams();
  const lobbyUrl = useHref(`/lobby/${id}`);
  const navigate = useNavigate();

  const {isMobile, isDesktop} = useMediaMatch();

  const [isPopupOpened, setPopupOpen] = useState<boolean>(false);

  const onPopupClose = () => setPopupOpen(false);
  const onPopupOpen = () => setPopupOpen(true);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const onLinkCopy = () => copyToClipboard(lobbyUrl);
  const onCodeCopy = () => copyToClipboard(id ?? '');

  const quit = () => navigate('/');

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
            value={id}
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
          <IconButton color='warning' onClick={quit}>
            <CloseIcon />
          </IconButton>
        </Box>

        <h2 style={{marginTop: LOBBY_H2_Y_MARGIN, marginBottom: LOBBY_H2_Y_MARGIN}}>Ожидаем участников команды</h2>

        <List style={{maxHeight: LIST_MAX_HEIGHT, overflowY: 'scroll'}}>
          {Array.from({length: LOBBY_CAPACITY}, (_v, i) => (
            <LobbyUserInfo key={nanoid()} user={i < TEST.length ? generateTestUser(TEST[i]) : undefined}/>
          ))}
        </List>

        <Box
          display='flex'
          flexDirection={!isDesktop ? 'column' : 'row'}
          gap={2}
          width={!isDesktop ? '100%' : DESKTOP_LOBBY_BUTTON_WIDTH}
          alignSelf='center'>
            <Button style={{width: '100%'}} variant='contained' color='secondary'>Готов играть</Button>
            <Button style={{width: '100%'}} variant='contained' color='primary' onClick={() => navigate(`/room/${id}`)}>Начать</Button>
        </Box>

        <QrCodePopup 
          isPopupOpened={isPopupOpened}
          onPopupClose={onPopupClose}
          onLinkSave={onLinkCopy}
          onCodeSave={onCodeCopy} />
      </Panel>
    </PanelGroup>
  );
}
