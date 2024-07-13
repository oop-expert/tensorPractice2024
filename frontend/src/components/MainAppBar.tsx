import { AppBar, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function MainAppBar() {
  const theme = useTheme();
  const isMatching = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position='static' sx={{height: 66, boxShadow: 'none'}} color={isMatching ? 'secondary' : 'primary'}>
      <Typography
        margin='auto'
        fontFamily='Roboto Slab Variable' 
        fontSize={28} 
        textAlign='center'>
          NeuroQuest
      </Typography>
    </AppBar>
  );
}
