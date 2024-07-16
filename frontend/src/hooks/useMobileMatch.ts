import { useMediaQuery, useTheme } from "@mui/material"

export const useMobileMatch = () => {
  const theme = useTheme();
  const isMathcingMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  return isMathcingMobile;
}
