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
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeightRegular: 400,
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
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          borderRadius: 50,
          boxShadow: 'none'
        }
      },
      styleOverrides: {
        containedPrimary: {
          minHeight: 50,
          paddingX: 5,
          '&:hover': {
            color: '#5B4C82',
          },
          '&:disabled': {
            color: '#FFFFFF',
            backgroundColor: '#B2AAC7' 
          }
        },
        outlinedPrimary: {
          minHeight: 50,
          paddingX: 5,
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#65558F' 
          },
          '&:disabled': {
            color: '#B2AAC7',
            borderColor: '#B2AAC7' 
          }
        },
        textPrimary: {
          minHeight: 30,
          maxHeight: 40,
          padding: 0,
          fontSize: 18,
          textDecoration: 'underline',
          textDecorationColor: '#5B4C82',
          '&:hover': {
            color: '#6840CF',
            textDecorationColor: '#6840CF',
            textDecoration: 'underline',
            backgroundColor: 'transparent'
          },
          '&:disabled': {
            color: '#B2AAC7',
            textDecorationColor: '#B2AAC7'
          }
        }
      },
      variants: [
        {
          props: {variant: 'flexEnd'},
          style: {
            width: '50%',
            minWidth: 160,
            alignSelf: 'flex-end',
            border: 'solid 1px #65558F',
            backgroundColor: 'transparent',
            '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#65558F' 
            },
            '&:disabled': {
              color: '#B2AAC7',
              borderColor: '#B2AAC7' 
            }
          }
        }
      ]
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
          sx: { top: -5, maxWidth: '60%' }
        }
      }
    },
    MuiCard: {
      defaultProps: {
        sx: {
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: '#ECE6F0',
          padding: 2,
          margin: '0 auto',
          alignSelf: 'center',
          maxWidth: 700,
          borderRadius: 10
        }
      }
    },
    MuiTypography: {
      defaultProps:{
        fontFamily: 'Roboto',
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'left'
      }
    },
    MuiList: {
      defaultProps: {
        sx: {
          '::-webkit-scrollbar': {
            borderRadius: 50,
            width: '8px'
          },
          '::-webkit-scrollbar-track': {
            borderRadius: 50,
            backgroundColor: '#FFFFFF',
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: 50,
            backgroundColor: '#65558F'
          }
        }
      }
    }
  }
})

export default UITheme;
