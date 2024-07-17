import { useMediaQuery, useTheme } from "@mui/material"

export const useMediaMatch = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  
  return {isMobile, isTablet, isDesktop};
}
