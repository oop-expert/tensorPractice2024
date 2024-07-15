import { AppBar, useMediaQuery, useTheme } from "@mui/material";

const MainPageHeaderSx = {
  height: 125, 
  boxShadow: 'none',
  borderRadius: 50,
  maxWidth: '100%'
}

export default function MainAppBar({isOnMainPage = false}: {isOnMainPage?: boolean}) {
  const theme = useTheme();
  const isMatching = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position='static' 
      sx={ isOnMainPage 
        ? MainPageHeaderSx
        : {
            height: isMatching ? 66 : 84, 
            boxShadow: 'none', 
            borderEndStartRadius: 50,
            borderEndEndRadius: 50,
            maxWidth: isMatching ? '100%' : '77%',
            margin: '0 auto'
          }
      } 
      color={isMatching ? 'secondary' : 'primary'}>
        <h1 style={{margin: 'auto'}}>NeuroQuest</h1>
    </AppBar>
  );
}
