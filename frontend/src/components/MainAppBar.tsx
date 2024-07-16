import { AppBar } from "@mui/material";
import { useMobileMatch } from "../hooks/useMobileMatch";
import { WIDTH_RELATIVE_TO_SCREEN } from "../utils/utils";

const MainPageHeaderSx = {
  height: 125, 
  boxShadow: 'none',
  borderRadius: 50,
  maxWidth: '100%'
}

export default function MainAppBar({isOnMainPage = false}: {isOnMainPage?: boolean}) {
  const isMatching = useMobileMatch();

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
            maxWidth: isMatching ? '100%' : WIDTH_RELATIVE_TO_SCREEN,
            margin: '0 auto',
            marginBottom: isMatching ? 0 : 5
          }
      } 
      color={isMatching ? 'secondary' : 'primary'}>
        <h1 style={{margin: 'auto'}}>NeuroQuest</h1>
    </AppBar>
  );
}
