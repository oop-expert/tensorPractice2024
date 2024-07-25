import { CircularProgress, Dialog, Typography } from "@mui/material";
import FlexBox from "./FlexBox";

export default function LoadingPopup({isOpened}: {isOpened: boolean}) {
  return (
    <Dialog open={isOpened}>
      <FlexBox direction='column' gap={3}>
        <Typography variant='h2'>Идёт генерация изображений ИИ</Typography>
        <CircularProgress sx={{alignSelf: 'center', width: '30vh'}} color='secondary'/>
      </FlexBox>
    </Dialog>
  );
}
