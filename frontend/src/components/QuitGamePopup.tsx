import { Button, Dialog, Typography } from "@mui/material";
import FlexBox from "./FlexBox";
import { useMediaMatch } from "../hooks/useMobileMatch";
import { useSelector } from "react-redux";
import { closePopup, selectPopupOpen } from "../store/popupSlice";
import { useAppDispatch } from "../store/storeHooks";

export default function QuitGamePopup({quitGame}: {quitGame: () => void}) {
  const {isMobile, isVerticalTablet} = useMediaMatch();

  const {isQuitOpened, closeWindow} = useSelector(selectPopupOpen);
  const dispatch = useAppDispatch();

  const onPopupClose = () => dispatch(closePopup());

  const onQuit = () => {
    onPopupClose();
    quitGame();
    if(closeWindow) {
      window.close();
    }
  };

  return (
    <Dialog open={isQuitOpened} onClose={onPopupClose}>
      <FlexBox direction='column' gap={3}>
        <Typography variant='h2'>Покинуть комнату?</Typography>
        <Typography variant='body1'>Внимание! Если вы выйдете из игры во время текущего раунда, вам не будет разрешено вернуться.
          <br/>Вы уверены, что хотите выйти?</Typography>

        <FlexBox direction={isMobile || isVerticalTablet ? 'column' : 'row'} gap={2} sx={{justifyContent: 'space-between'}}>
          <Button variant='contained' color='secondary' onClick={onQuit}>Выйти</Button>
          <Button variant='contained' color='primary' onClick={onPopupClose}>Вернуться к игре</Button>
        </FlexBox>
      </FlexBox>
    </Dialog>
  );
}
