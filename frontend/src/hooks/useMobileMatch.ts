import { useMediaQuery, useTheme } from "@mui/material"

export const useMediaMatch = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isHorizontalTablet = useMediaQuery(theme.breakpoints.only('md')) && screen.orientation.type === 'landscape-primary';
  const isVerticalTablet = useMediaQuery(theme.breakpoints.down('lg')) && screen.orientation.type === 'portrait-primary';
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const isXL = useMediaQuery(theme.breakpoints.only('xl'));
  
  return {isMobile, isVerticalTablet, isHorizontalTablet, isDesktop, isXL};
}
