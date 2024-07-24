import { AppBar, Box, IconButton, SxProps, Typography } from '@mui/material';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MobileMenu from './MobileMenu';
import { useLocation } from 'react-router-dom';
import FlexBox from './FlexBox';
import DefaultAvatar from './DefaultAvatar';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../store/playerSlice';

const getHeaderSx = (isMobile: boolean, isVTablet: boolean, isInternal: boolean): SxProps => {
  if(isInternal) {
    return {
      height: 125, 
      boxShadow: 'none',
      borderRadius: 50,
      maxWidth: '100%',
      margin: '0 auto'
    };
  } else if(isMobile) {
    return {
      height: '10vh', 
      boxShadow: 'none', 
      borderEndStartRadius: 50,
      borderEndEndRadius: 50,
      maxWidth: '100%',
      margin: '0 auto',
      marginBottom: 0,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    };
  }
  return (
    {
      height: '10vh', 
      boxShadow: 'none', 
      borderEndStartRadius: 50,
      borderEndEndRadius: 50,
      width: WIDTH_RELATIVE_TO_SCREEN,
      margin: '0 auto',
      marginBottom: isVTablet ? '0' : '5vh'
    }
  );
}

export default function MainAppBar({isInternal = false}: {isInternal?: boolean}) {
  const {isMobile, isHorizontalTablet, isVerticalTablet, isDesktop} = useMediaMatch();
  const [isMenuOpened, setMenuOpen] = useState<boolean>(false);

  const {player} = useSelector(selectPlayer);
  
  const {pathname} = useLocation();

  const isOnMainPage = pathname.length < 2 && !isInternal;

  if(isOnMainPage && (isDesktop || isHorizontalTablet) || isInternal && !isDesktop && !isHorizontalTablet) {
    return <></>;
  } 

  const isOnRoomPage = (isMobile || isVerticalTablet) && (pathname.includes('room') || pathname.includes('test'));

  const openMenu = () => setMenuOpen((isOpened) => !isOpened);
  const closeMenu = () => setMenuOpen(false);

  return (
    <AppBar
      position='static' 
      sx={ getHeaderSx(isMobile, isVerticalTablet, isInternal) } 
      color={isMobile ? 'secondary' : 'primary'}>
        {isOnRoomPage 
          ? <FlexBox direction='row' gap={2}>
              <DefaultAvatar src={player.avatar} width='8vh' userId={player.id}/>
              <Typography variant='h2' textAlign='left'>{player.name}</Typography>
            </FlexBox>
          : <Typography variant='h1' style={{margin: isMobile ? '0' : 'auto'}}>NeuroQuest</Typography>}

        <Box hidden={!isMobile || isOnMainPage} position='relative'>
          <IconButton color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>

          <MobileMenu isOpened={!isOnMainPage && isMenuOpened} closeMenu={closeMenu}/>
        </Box>
    </AppBar>
  );
}
