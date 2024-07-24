import { Box } from "@mui/material";
import PanelProps from "../utils/types/PanelProps";
import { Colors } from "../utils/utils";

export default function Panel({children, isMatchingMobile, direction='column', width='100%', height='100%', gap=2, margin=0, padding=5, position='unset', hidden=false, sx={}}: PanelProps) {
  const desktopPadding = isMatchingMobile ? 0 : padding;

  return (
    <Box
      sx={sx}
      position={position}
      display={hidden ? 'none' : 'flex'}
      flexDirection={direction}
      gap={gap}
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
