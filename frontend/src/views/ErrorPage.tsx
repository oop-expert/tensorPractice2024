import { Box } from "@mui/material";

export default function ErrorPage({message}: {message: string}) {
  return (
    <Box maxWidth={500} minWidth={100} padding={2} bgcolor='gray' borderRadius={5}>
      <p>{message}</p>
    </Box>
  );
}
