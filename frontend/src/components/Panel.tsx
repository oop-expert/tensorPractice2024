import { Box } from "@mui/material";
import PanelProps from "../utils/types/PanelProps";

export default function Panel({children, isMatchingMobile, width='100%', height='100%', margin=0}: PanelProps) {
  const desktopPadding = isMatchingMobile ? 0 : 2;

  return (
    <Box
      display='flex'
      flexDirection='column'
      gap={2}
      bgcolor={isMatchingMobile ? 'transparent' : '#ECE6F0'}
      borderRadius={10}
      padding={desktopPadding}
      width={`calc(${width} - ${desktopPadding}rem)`}
      height={height}
      margin={margin}>
        {children}
    </Box>
  );
}
