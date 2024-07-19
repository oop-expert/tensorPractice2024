import { Box } from "@mui/material";
import { useEffect, useState } from "react"


const COUNTDOWN_INITIAL_TIME_IN_SECONDS = 30

export default function Timer() {
  const [secondsAmount, setSecondsAmount] = useState(COUNTDOWN_INITIAL_TIME_IN_SECONDS)

  useEffect(() => {
    if (secondsAmount == 0) {
      //alert('End')
      return;
    }

    setTimeout(() => {
      setSecondsAmount(state => state - 1);
    }, 1000)
  }, [secondsAmount]);

  const minutes = Math.floor(secondsAmount / 60);
  const seconds = secondsAmount % 60;

  return (
    <Box sx={{display:'flex', justifyContent:'center'}}>
      <Box sx={{fontSize:'2.5vh', fontWeight:500, border:'3px solid #F49C1E', color:'#F49C1E', borderRadius:'30px', width:'15vh'}}>
        <span>{String(minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, '0')}</span>
      </Box>
    </Box>
  )
}
