import { Box } from "@mui/material";
import PanelProps from "../utils/types/PanelProps";
import { Colors } from "../utils/utils";

export default function Panel({children, isMatchingMobile, width='100%', height='100%', margin=0, padding=2, position='unset'}: PanelProps) {
  const desktopPadding = isMatchingMobile ? 0 : padding;

  return (
    <Box
      position={position}
      display='flex'
      flexDirection='column'
      gap={2}
      bgcolor={isMatchingMobile ? 'transparent' : Colors.PANEL}
      borderRadius={10}
      padding={desktopPadding}
      width={`calc(${width} - ${desktopPadding}rem)`}
      height={height}
      margin={margin}>
        {children}
    </Box>
  );
}
