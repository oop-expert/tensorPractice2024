import { AppBar, Box, IconButton, SxProps, Typography } from '@mui/material';
import { useMediaMatch } from '../hooks/useMobileMatch';
import { WIDTH_RELATIVE_TO_SCREEN } from '../utils/utils';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import MobileMenu from './MobileMenu';

const getHeaderSx = (isMobile: boolean, isInternal: boolean): SxProps => {
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
      height: 65, 
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
      marginBottom: '5vh'
    }
  );
}

export default function MainAppBar({isOnMainPage = false, isInternal = false}: {isOnMainPage?: boolean, isInternal?: boolean}) {
  const {isMobile, isDesktop} = useMediaMatch();
  const [isMenuOpened, setMenuOpen] = useState<boolean>(false);
  
  if(isOnMainPage && isDesktop || isInternal && !isDesktop) {
    return <></>;
  } 

  const openMenu = () => setMenuOpen((isOpened) => !isOpened);
  const closeMenu = () => setMenuOpen(false);

  return (
    <AppBar
      position='static' 
      sx={ getHeaderSx(isMobile, isInternal) } 
      color={isMobile ? 'secondary' : 'primary'}>
        <Typography variant='h1' style={{margin: isMobile ? '0' : 'auto'}}>NeuroQuest</Typography>

        <Box hidden={!isMobile || isOnMainPage} position='relative'>
          <IconButton color='inherit' onClick={openMenu}>
            <MenuIcon />
          </IconButton>

          <MobileMenu isOpened={!isOnMainPage && isMenuOpened} closeMenu={closeMenu}/>
        </Box>
    </AppBar>
  );
}
