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
      contrastText: '#5B4C82',
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
      fontFamily: 'Roboto Slab Variable',
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
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: 50,
          boxShadow: 'none',
          paddingX: 5,
          minHeight: 50,
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
    MuiIconButton: {
      defaultProps: {
        sx: {
          bgcolor: '#65558F',
          
          '&:hover': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);'
          },
          '$:active': {
            backgroundColor: '#FEF9FF',
            boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);'
          },
          '&:disabled': {
            backgroundColor: '#B2AAC7' 
          },
          '&:hover *': {
            color: '#65558F'
          },
          '$:active *': {
            color: '#65558F'
          }
        },
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        color: 'info',
        InputProps: {
          sx: {
            bgcolor: '#FFFFFF',
            borderColor: '#87898F',
            borderRadius: 50,
            padding: 0,
            height: 50
          }
        },
        InputLabelProps: {
          sx: { top: -2 }
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        item: {
          borderRadius: 40
        }
      }
    },
    MuiContainer: {
      variants: [
        {
          props: {title: 'panels-group'},
          style: {
            padding: 0,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }
        }, 
        {
          props: {title: 'desktop-panel'},
          style: {
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: '#ECE6F0'
          }
        },
        {
          props: {title: 'mobile-panel'},
          style: {
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            backgroundColor: 'transparent'
          }
        }
      ]
    }
  }
})

export default UITheme;
