import { Components, createTheme, PaletteOptions, Theme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { Colors } from "./utils";

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

const Typography: TypographyOptions = {
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
};

const ButtonOptions: Components<Omit<Theme, 'components'>>['MuiButton'] = {
  defaultProps: {
    sx: {
      borderRadius: 50,
      boxShadow: 'none',
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
      paddingX: 5,
      color: Colors.Text.ON_BUTTON,
      backgroundColor: Colors.PrimaryButton.ACTIVE,
      border: 'solid 2px',
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
      paddingX: 5,
      color: Colors.Text.ON_BUTTON,
      backgroundColor: Colors.SecondaryButton.ACTIVE,
      border: 'solid 2px',
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
      minHeight: 30,
      maxHeight: 40,
      padding: 0,
      fontSize: 18,
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
      paddingX: 5,
      color: Colors.Text.PRIMARY,
      lineHeight: 1,
      textAlign: 'left',
      backgroundColor: Colors.TRANSPARENT,
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
      backgroundColor: Colors.PrimaryButton.ACTIVE,
      border: 'solid 2px',
      borderColor: Colors.PrimaryButton.ACTIVE,
      '&:hover': {
        backgroundColor: Colors.PrimaryButton.HOVERED,
        borderColor: Colors.PrimaryButton.ACTIVE,
      },
      '$:active': {
        backgroundColor: Colors.PrimaryButton.CLICKED,
        borderColor: Colors.PrimaryButton.CLICKED,
      },
      '&:disabled': {
        backgroundColor: Colors.PrimaryButton.DISABLED,
        borderColor: Colors.PrimaryButton.DISABLED,
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
      backgroundColor: Colors.SecondaryButton.ACTIVE,
      border: 'solid 2px',
      borderColor: Colors.SecondaryButton.ACTIVE,
      '&:hover': {
        backgroundColor: Colors.SecondaryButton.HOVERED,
        borderColor: Colors.SecondaryButton.ACTIVE,
      },
      '$:active': {
        backgroundColor: Colors.SecondaryButton.CLICKED,
        borderColor: Colors.SecondaryButton.CLICKED,
      },
      '&:disabled': {
        backgroundColor: Colors.SecondaryButton.DISABLED,
        borderColor: Colors.SecondaryButton.DISABLED,
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
    variant: 'outlined',
    InputProps: {
      sx: {
        bgcolor: Colors.VoidInput.FILL,
        borderColor: Colors.VoidInput.OUTLINE,
        borderRadius: 50,
        padding: 0,
        height: 50
      }
    },
    InputLabelProps: {
      sx: { top: -5, maxWidth: '60%' }
    }
  }
};

const MuiTypographyOptions: Components<Omit<Theme, 'components'>>['MuiTypography'] = {
  defaultProps:{
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 400,
    textAlign: 'left'
  }
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
        padding: 5, 
        width: '20%',
        minWidth: '200px'
      }
    }
  }
}

const UITheme = createTheme({
  palette: Palette,
  typography: Typography,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1100,
      xl: 1536,
    }
  },
  components: {
    MuiButton: ButtonOptions,
    MuiIconButton: IconButtonOptions,
    MuiTextField: TextFieldOptions,
    MuiTypography: MuiTypographyOptions,
    MuiList: ListOptions,
    MuiDialog: DialogOptions
  }
})

export default UITheme;
