import { CircularProgress, Dialog, Typography } from "@mui/material";

export default function LoadingPopup({isOpened}: {isOpened: boolean}) {
  return (
    <Dialog open={isOpened}>
      <Typography variant='h2'>Идёт генерация изображений ИИ</Typography>
      <CircularProgress sx={{alignSelf: 'center'}} color='secondary'/>
    </Dialog>
  );
}
