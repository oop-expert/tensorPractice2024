import { Avatar, Box, Button, Container, Stack } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";


export default function ResultsPage({name}: {name: string},{color}: {color: string}){
    const navigate = useNavigate();
      
    return(
        <Container maxWidth='lg' sx={{bgcolor: 'white', padding: '1.3vh', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
          <Container maxWidth='md' sx={{display: 'flex',padding: '0vw', flexDirection: 'row',justifyContent:'center', alignItems: 'center', gap:'2px'}}>
            <Box sx={{display: 'flex', fontSize:'2vh',flexDirection: 'column',  alignItems: 'center'}}>
                <h1>Результаты игры</h1>
                <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '15vh', height: '15vh'}} >
                    <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                </Avatar>
                <Box sx={{marginY:'1.6vw'}}>
                    <h4>{name}</h4>
                    <h4>Итоговые баллы: 2500</h4>
                </Box>
                
                <Stack spacing={{ xs: 1, sm: 3 }} direction="column" useFlexGap flexWrap="nowrap" justifyContent='flex-start' marginBottom='1.6vw'>
                    <Box sx={{display: 'flex', justifyContent:'flex-start', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center'}}>
                        <p>2 место</p>
                        <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '5vh', height: '5vh'}} >
                            <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                        </Avatar>
                        <p>{name}</p>
                        <p>2250</p>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent:'flex-start', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center'}}>
                        <p>3 место</p>
                        <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '5vh', height: '5vh'}} >
                            <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                        </Avatar>
                        <p>{name}</p>
                        <p>1800</p>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent:'flex-start', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center'}}>
                        <p>4 место</p>
                        <Avatar alt='avatar 1' variant='circular' sx={{bgcolor: color, width: '5vh', height: '5vh'}} >
                            <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                        </Avatar>
                        <p>{name}</p>
                        <p>800</p>
                    </Box>
                </Stack>

                <Button 
          variant='contained'
          onClick={() => navigate(`/lobby/${nanoid()}`)}>
            Играть снова
        </Button>
            </Box>
           </Container>
        </Container>
    );
}