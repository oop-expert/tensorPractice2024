import { createTheme } from "@mui/material";

const UITheme = createTheme({
  palette: {
    primary: {
      light: '#65558F',
      main: '#65558F',
      dark: '#FEF9FF',
      contrastText: '#FFFFFF'
    },
    secondary: {
      light: '#FEF9FF',
      main: '#FEF9FF',
      dark: '#65558F',
      contrastText: '#5B4C82'
    },
    info: {
      light: '#65558F',
      main: '#65558F',
      dark: '#FEF9FF',
      contrastText: '#5B4C82'
    },
    common: {
      black: '#000000',
      white: '#FFFFFF'
    },
    mode: 'light',
    warning: {
      light: '#87375A',
      main: '#87375A',
      dark: '#D46C99',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#5B4C82',
      secondary: '#87898F',
      disabled: '#B2AAC7'
    },
    divider: '#DED2DF',
    background: {
      default: '#FEF9FF',
      paper: '#FEF9FF'
    }
  },
  typography: {
    h1: {
      fontFamily: 'Roboto Slab Variant',
      fontSize: 28,
      fontWeight: 500,
      textAlign: 'center'
    },
    h2: {
      fontSize: 24,
      fontWeight: 500,
      textAlign: 'center'
    },
    button: {
      fontSize: 21,
      fontWeight: 500,
      textAlign: 'center',
      textTransform: 'none',
      letterSpacing: 'normal',
      color: 'secondary'
    },
    body1: {
      fontSize: 18,
      fontWeight: 400
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: 50,
          boxShadow: 'none',
          '&:hover': {
            color: '#5B4C82',
          },
          '&:disabled': {
            color: '#FFFFFF',
            backgroundColor: '#B2AAC7' 
          }
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        color: 'info',
        InputProps: {
          sx: {
            borderColor: '#87898F',
            borderRadius: 50
          }
        }
      }
    }
  }
})

export default UITheme;
