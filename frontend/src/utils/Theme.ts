import { BreakpointsOptions, Components, createTheme, PaletteOptions, Theme } from "@mui/material";
import { Colors } from "./utils";

const Breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 9999,
    lg: 9999,
    md: 9999,
    xl: 9999
  }
}

const defaultTheme = createTheme({breakpoints: Breakpoints});

const Palette: PaletteOptions = {
  primary: {
    light: Colors.SecondaryButton.ACTIVE,
    main: Colors.SecondaryButton.ACTIVE,
    dark: Colors.SecondaryButton.ACTIVE,
    contrastText: Colors.Text.ON_BUTTON
  },
  secondary: {
    light: Colors.TRANSPARENT,
    main: Colors.TRANSPARENT,
    dark: Colors.TRANSPARENT,
    contrastText: Colors.Text.PRIMARY
  },
  mode: 'light',
  error: {
    light: Colors.ErrorInput.OUTLINE,
    main: Colors.ErrorInput.OUTLINE,
    dark: Colors.ErrorInput.OUTLINE,
    contrastText: Colors.Text.PRIMARY
  },
  success: {
    light: Colors.SuccessInput.OUTLINE,
    main: Colors.SuccessInput.OUTLINE,
    dark: Colors.SuccessInput.OUTLINE,
    contrastText: Colors.Text.PRIMARY
  },
  text: {
    primary: Colors.Text.PRIMARY,
    secondary: Colors.Text.SECONDARY,
    disabled: Colors.Text.DISABLED
  },
  divider: 'rgba(0, 0, 0, 0)',
  background: {
    default: Colors.BACKGROUND,
    paper: Colors.PANEL
  }
};

const ButtonOptions: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    sx: {
      borderRadius: 50,
      boxShadow: 'none',
      paddingX:'33px',
      fontSize: 21,
      letterSpacing: 'initial',
      fontWeight:'initial',
      [defaultTheme.breakpoints.up('xl')]: {
        fontSize: 30,
      },
      lineHeight: 1,
      textTransform: 'none',
      '&:hover': {
        boxShadow: 'none'
      },
      '&:active': {
        boxShadow: 'none'
      }
    }
  },
  styleOverrides: {
    containedPrimary: {
      minHeight: 50,
      [defaultTheme.breakpoints.up('xl')]: {
        minHeight: 70,
      },
      paddingX: 5,
      color: Colors.Text.ON_BUTTON,
      backgroundColor: Colors.PrimaryButton.ACTIVE,
      border: 'none',
      borderColor: Colors.PrimaryButton.ACTIVE,
      '&:hover': {
        color: Colors.Text.HIGHLIGHT_MAJOR,
        backgroundColor: Colors.PrimaryButton.HOVERED,
        borderColor: Colors.PrimaryButton.ACTIVE,
      },
      '&:active': {
        color: Colors.Text.HIGHLIGHT_MAJOR,
        backgroundColor: Colors.PrimaryButton.CLICKED,
        borderColor: Colors.PrimaryButton.CLICKED,
      },
      '&:disabled': {
        color: Colors.Text.ON_BUTTON,
        backgroundColor: Colors.PrimaryButton.DISABLED,
        borderColor: Colors.PrimaryButton.DISABLED,
      }
    },
    containedSecondary: {
      minHeight: 50,
      [defaultTheme.breakpoints.up('xl')]: {
        minHeight: 70,
      },
      paddingX: 5,
      color: Colors.Text.ON_BUTTON,
      backgroundColor: Colors.SecondaryButton.ACTIVE,
      border: 'none',
      borderColor: Colors.SecondaryButton.ACTIVE,
      '&:hover': {
        color: Colors.Text.HIGHLIGHT_MINOR,
        backgroundColor: Colors.SecondaryButton.HOVERED,
        borderColor: Colors.SecondaryButton.ACTIVE,
      },
      '&:active': {
        color: Colors.Text.HIGHLIGHT_MINOR,
        backgroundColor: Colors.SecondaryButton.CLICKED,
        borderColor: Colors.SecondaryButton.CLICKED,
      },
      '&:disabled': {
        color: Colors.Text.ON_BUTTON,
        backgroundColor: Colors.SecondaryButton.DISABLED,
        borderColor: Colors.SecondaryButton.DISABLED,
      }
    },
    textPrimary: {
      minHeight: 40,
      maxHeight: 50,
      [defaultTheme.breakpoints.up('xl')]: {
        minHeight: 60,
        maxHeight: 70
      },
      padding: 0,
      fontSize: 18,
      textAlign: 'left',
      color: Colors.Text.PRIMARY,
      textDecoration: 'underline',
      textDecorationColor: Colors.Text.PRIMARY,
      '&:hover': {
        color: Colors.Text.HIGHLIGHT_MAJOR,
        textDecorationColor: Colors.Text.HIGHLIGHT_MAJOR,
        textDecoration: 'underline',
        backgroundColor: Colors.TRANSPARENT
      },
      '&:active': {
        color: Colors.Text.HIGHLIGHT_MAJOR,
        textDecoration: 'none',
        backgroundColor: Colors.TRANSPARENT
      },
      '&:disabled': {
        color: Colors.Text.DISABLED,
        textDecorationColor: Colors.Text.DISABLED
      }
    },
    textSecondary: {
      minHeight: 50,
      [defaultTheme.breakpoints.up('xl')]: {
        minHeight: 70,
      },
      paddingX: 5,
      color: Colors.Text.PRIMARY,
      lineHeight: 1,
      textAlign: 'left',
      backgroundColor: Colors.TRANSPARENT,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      '&:hover': {
        backgroundColor: Colors.SecondaryButton.DISABLED
      },
      '&:active': {
        backgroundColor: Colors.SecondaryButton.CLICKED
      },
      '&:disabled': {
        color: Colors.Text.DISABLED,
        backgroundColor: Colors.SecondaryButton.DISABLED
      },
    }
  }
};

const IconButtonOptions: Components<Omit<Theme, 'components'>>['MuiIconButton'] = {
  styleOverrides: {
    colorPrimary: {
      borderColor: Colors.PrimaryButton.ACTIVE,
      '&:hover': {
      },
      '$:active': {
      },
      '&:disabled': {
      },
      '*': {
        color: Colors.Text.ON_BUTTON
      },
      '&:hover *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      },
      '$:active *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      }
    },
    colorSecondary: {
      borderColor: Colors.SecondaryButton.ACTIVE,
      '&:hover': {
      },
      '$:active': {
      },
      '&:disabled': {
      },
      '*': {
        color: Colors.Text.ON_BUTTON
      },
      '&:hover *': {
        color: Colors.Text.HIGHLIGHT_MINOR
      },
      '$:active *': {
        color: Colors.Text.HIGHLIGHT_MINOR
      }
    },
    colorInherit: {
      backgroundColor: Colors.TRANSPARENT,
      '*': {
        color: Colors.Text.PRIMARY
      },
      '&:hover *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      },
      '$:active *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      },
      '$:disabled *': {
        color: Colors.Text.DISABLED
      }
    },
    colorWarning: {
      backgroundColor: Colors.TRANSPARENT,
      border: 'solid 2px',
      borderColor: Colors.PrimaryButton.ACTIVE,
      '&:hover': {
        borderColor: Colors.PrimaryButton.ACTIVE,
        backgroundColor: Colors.PrimaryButton.HOVERED,
      },
      '$:active': {
        borderColor: Colors.PrimaryButton.CLICKED,
        backgroundColor: Colors.PrimaryButton.CLICKED,
      },
      '&:disabled': {
        borderColor: Colors.PrimaryButton.DISABLED,
        backgroundColor: Colors.TRANSPARENT,
      },
      '*': {
        color: Colors.Text.HIGHLIGHT_MAJOR,
      },
      '&:hover *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      },
      '$:active *': {
        color: Colors.Text.HIGHLIGHT_MAJOR
      },
      '$:disabled *': {
        color: Colors.Text.DISABLED
      }
    }
  }
};

const TextFieldOptions:  Components<Omit<Theme, 'components'>>['MuiTextField'] = {
  defaultProps: {
    autoComplete: 'off',
    variant: 'filled',
    InputProps: {
      disableUnderline: true,
      sx: {
        borderRadius: 50,
        padding: 0,
        minHeight: '50px',
        height: '50px',
        fontSize: 18,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
          minHeight: '70px',
          height: '70px'
        }
      }
    },
    inputProps: {
      style: {
        alignContent: 'center'
      }
    },
    InputLabelProps: {
      sx: { 
        top: -3,
        maxWidth: '60%', 
        color: Colors.Text.PLACEHOLDER,
        fontSize: 18,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
        },
      }
    },
    FormHelperTextProps: {
      sx: {
        fontSize: 14,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 24,
        },
        color: Colors.Text.HIGHLIGHT_MAJOR
      }
    }
  },
  styleOverrides: {
    root: {
      '& .MuiFilledInput-root': {
        backgroundColor: Colors.VoidInput.FILL,
        border: `solid 2px ${Colors.VoidInput.OUTLINE}`,
        borderRadius: 50,
        minHeight: '50px',
        height: '50px',
        fontSize: 18,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
          minHeight: '70px',
          height: '70px'
        },
        '&.Mui-focused': {
          backgroundColor: Colors.VoidInput.FILL,
          border: `solid 3px ${Colors.Text.HIGHLIGHT_MINOR}`,
        },
        '&.MuiInputBase-colorSuccess': {
          
            backgroundColor: Colors.SuccessInput.FILL,
            border: `solid 3px ${Colors.SuccessInput.OUTLINE}`,

        },
        '&.MuiInputBase-colorError': {

            backgroundColor: Colors.ErrorInput.FILL,
            border: `solid 3px ${Colors.ErrorInput.OUTLINE}`

        },
        '&.MuiInputBase-colorInfo': {

            backgroundColor: Colors.InfoInput.FILL,
            border: `solid 2px ${Colors.InfoInput.OUTLINE}`

        },
        '& .MuiFilledInput-input': {
          padding: 0,
          paddingLeft: 10,
          paddingRight: 10,
        }
      }
    }
  }
};

const TypographyOptions: Components<Omit<Theme, 'components'>>['MuiTypography'] = {
  defaultProps:{
    style: {
      fontFamily: 'Roboto'
    }
  },
  variants: [
    {
      props: {variant: 'h1'},
      style: {
        fontFamily: 'Roboto Slab Variable',
        fontSize: 28,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 48,
        },
        fontWeight: 500,
        textAlign: 'center'
      }
    },
    {
      props: {variant: 'h2'},
      style: {
        fontSize: 24,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 40,
        },
        fontWeight: 500,
        textAlign: 'center'
      }
    },
    {
      props: {variant: 'h3'},
      style: {
        fontSize: 22,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
        },
        fontWeight: 500,
        textAlign: 'left'
      }
    },
    {
      props: {variant: 'h4'},
      style: {
        fontSize: '20px',
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: '20px',
        },
        fontWeight: 500,
        textAlign: 'left'
      }
    },
    {
      props: {variant: 'button'},
      style: {
        fontSize: 21,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
        },
        fontWeight: 500,
        textAlign: 'center',
        textTransform: 'none',
        letterSpacing: 'normal',
        lineHeight: 1,
        color: Colors.Text.ON_BUTTON
      }
    },
    {
      props: {variant: 'body1'},
      style: {
        fontSize: 18,
        fontWeight: 400,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 30,
          fontWeight: 500
        },
        textAlign: 'left',
        lineHeight: 1
      }
    },
    {
      props: {variant: 'caption'},
      style: {
        fontSize: 24,
        [defaultTheme.breakpoints.up('xl')]: {
          fontSize: 40,
        },
        fontWeight: 500,
        textAlign: 'center',
        backgroundColor: Colors.Text.ON_BUTTON,
        borderRadius: 50,
        padding: 2
      }
    }
  ]
}

const ListOptions: Components<Omit<Theme, 'components'>>['MuiList'] = {
  defaultProps: {
    sx: {
      '::-webkit-scrollbar': {
        borderRadius: 50,
        width: '8px'
      },
      '::-webkit-scrollbar-track': {
        borderRadius: 50,
        backgroundColor: Colors.ScrollBar.TRACK,
      },
      '::-webkit-scrollbar-thumb': {
        borderRadius: 50,
        backgroundColor: Colors.ScrollBar.THUMB
      }
    }
  }
}

const DialogOptions: Components<Omit<Theme, 'components'>>['MuiDialog'] = {
  defaultProps: {
    PaperProps: {
      sx: {
        borderRadius: 5,
        minWidth: '200px',
        margin: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }
  },
  styleOverrides: {
    paperWidthSm: {
      width: '90%',
      padding: '3vw'
    },
    paperWidthMd: {
      width: '50%',
      padding: '3vw'
    },
    paperWidthLg: {
      width: '500px',
      padding: '50px'
    }
  }
}

const CircularProgressOptions: Components<Omit<Theme, 'components'>>['MuiCircularProgress'] = {
  styleOverrides: {
    colorPrimary: {
      color: Colors.Text.ON_BUTTON
    },
    colorSecondary: {
      color: Colors.Text.HIGHLIGHT_MAJOR
    }
  }
}

const GridOptions: Components<Omit<Theme, 'components'>>['MuiGrid'] = {
  styleOverrides: {
    item: {
      padding: 0
    },
    container: {
      padding: 0
    }
  }
}

const AvatarGroupOptions: Components<Omit<Theme, 'components'>>['MuiAvatarGroup'] = {
  defaultProps: {
    slotProps: {
      additionalAvatar: {
        sx: {
          backgroundColor: Colors.TRANSPARENT,
          color: Colors.Text.PRIMARY,
          fontFamily: 'Roboto',
          fontSize: 20,
          fontWeight: 700
        }
      }
    }
  }
}

const UITheme = createTheme({
  palette: Palette,
  breakpoints: Breakpoints,
  components: {
    MuiButton: ButtonOptions,
    MuiIconButton: IconButtonOptions,
    MuiTextField: TextFieldOptions,
    MuiTypography: TypographyOptions,
    MuiList: ListOptions,
    MuiDialog: DialogOptions,
    MuiCircularProgress: CircularProgressOptions,
    MuiGrid: GridOptions,
    MuiAvatarGroup: AvatarGroupOptions
  }
})

export default UITheme;
