import { Box, Button, IconButton, List, TextField, useMediaQuery, useTheme } from '@mui/material';
import Panel from '../components/Panel';
import ShareIcon from '@mui/icons-material/Share';
import LobbyUserInfo from '../components/LobbyUserInfo';
import { nanoid } from 'nanoid';
import { faker } from '@faker-js/faker/locale/ru';
import { AVATAR_BG_COLORS, getRandomInteger, WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import TestUser from '../utils/types/TestUser';
import { useHref, useNavigate, useParams } from 'react-router-dom';
import { useReducer } from 'react';
import QrCodePopup from '../components/QrCodePopup';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    flexEnd: true;
  }
}

const TEST = [1, 2, 3, 4, 5];
const LOBBY_CAPACITY = 10;
const LIST_MAX_HEIGHT = '375px';
const DESKTOP_LOBBY_BUTTON_WIDTH = '70%';

const generateTestUser = (id: number): TestUser => ({
  id: `${nanoid()}${id}`,
  username: faker.person.firstName(),
  avatarColor: AVATAR_BG_COLORS[getRandomInteger(0, AVATAR_BG_COLORS.length - 1)],
  status: getRandomInteger(0, 1) === 0 ? 'Не готов' : 'Готов'
});

export default function LobbyPage() {
  const {id} = useParams();
  const lobbyUrl = useHref(`/lobby/${id}`);
  const navigate = useNavigate();

  const theme = useTheme();
  const isMatchingMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMatchingTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [isPopupOpened, dispacthPopupOpen] = useReducer((opened) => !opened, false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Panel 
      isMatchingMobile={isMatchingMobile} 
      width={isMatchingMobile ? '100%' : WIDTH_RELATIVE_TO_SCREEN} 
      margin={'0 auto'}> 
      {isMatchingMobile
      ? <>
          <h2 hidden={!isMatchingMobile}>Ожидаем присоединения всех игроков.</h2>
          <Button 
            variant='flexEnd' 
            endIcon={<ShareIcon />}
            onClick={dispacthPopupOpen}>
              Поделиться
          </Button>
        </>
      : <Box
          hidden={isMatchingMobile}
          display='flex'
          flexDirection={isMatchingTablet ? 'column' : 'row'}
          justifyContent='space-between'
          alignItems='center'
          gap={1}>
          <Box 
            display='flex'
            flexDirection='row'
            gap={1}
            alignItems='center'>
            <h2 style={{margin: 0}}>Поделиться комнатой:</h2>
            <IconButton onClick={dispacthPopupOpen}>
              <QrCode2Icon sx={{color: 'white'}}/>
            </IconButton>

            <IconButton onClick={() => copyToClipboard(lobbyUrl)}>
              <InsertLinkIcon sx={{color: 'white'}}/>
            </IconButton>
          </Box>

          <TextField
            id='code'
            value={id}
            aria-readonly
            InputProps={(
              {
                endAdornment: (
                  <IconButton
                    onClick={() => copyToClipboard(id ?? '')}>
                      <ContentCopyIcon sx={{color: 'white'}}/>
                  </IconButton>
                ),
                sx: (theme) => ({...theme.components?.MuiTextField?.defaultProps?.InputProps?.sx}) 
              }
            )}
          />
        </Box>
      }

      <List style={{maxHeight: LIST_MAX_HEIGHT, overflowY: 'scroll'}}>
        {Array.from({length: LOBBY_CAPACITY}, (_v, i) => (
          <LobbyUserInfo key={nanoid()} user={i < TEST.length ? generateTestUser(TEST[i]) : undefined}/>
        ))}
      </List>

      <Box
        display='flex'
        flexDirection={isMatchingTablet ? 'column' : 'row'}
        gap={2}
        width={isMatchingTablet ? '100%' : DESKTOP_LOBBY_BUTTON_WIDTH}
        alignSelf='center'>
        <Button style={{width: '100%'}} variant='contained'>Готов играть</Button>
        <Button style={{width: '100%'}} variant='contained' onClick={() => navigate(`/room/${id}`)}>Начать</Button>
      </Box>

      <QrCodePopup 
        onPopupClose={dispacthPopupOpen}
        onLinkSave={() => copyToClipboard(lobbyUrl)}
        onCodeSave={() => copyToClipboard(id ?? '')} 
        hidden={!isPopupOpened} />
    </Panel>
  );
}
