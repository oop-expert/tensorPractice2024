import { Avatar, Box, Button, Container, List, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from "react-redux";
import { selectPlayer } from "../store/playerSlice";


export default function ResultsPage(){
    const navigate = useNavigate();
    const {isMobile} = useMediaMatch();
    const player = useSelector(selectPlayer)
    console.log(player)
      
    return(
        <Container maxWidth='lg' sx={{padding: '1.3vh', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}>
          <Container maxWidth='md' sx={{display: 'flex', padding: '0vw', flexDirection: 'row',justifyContent:'center', alignItems: 'center', gap:'2px'}}>
            <Box sx={{display: 'flex', fontSize:'2vh',flexDirection: 'column',  alignItems: 'center'}}>
                <Typography sx={{fontSize:'48', fontWeight:'700', borderRadius:'142px', padding:'15'}}>Результаты игры</Typography>
                <Box width={'100%'} display={isMobile ? 'none' : 'flex'} >
                    <Typography sx={{textAlign:'left', padding:'0.1vh 2vh', marginY:'1vh', border:'6px solid #FDD59C', borderRadius:'41px', background:'#FDD59C', color:'black'}}>Победитель:</Typography>
                </Box>
                <Stack direction={isMobile ? 'column' : 'row'}  sx={{display:'flex', alignItems:'center', paddingY:'1vh', margin:'0.9vh', border:'6px solid #FDD59C', borderRadius:'41px', background:'#FDD59C', width:'100%'}}>
                    <Avatar alt='avatar 1' variant='circular' sx={{ width: '15vh', height: '15vh'}} >
                        <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                    </Avatar>
                    <Box alignItems={isMobile ? 'center' : 'flex-start'} sx={{margin:'1.6vw', display:'flex', flexDirection:'column', gap:'3vh'}}>
                            <Typography style={{fontWeight:'500', fontSize:'3vh', color:'#C94F48'}}>Екатерина</Typography>
                            {/* <CardMedia 
                                component="img"
                                alt="Медаль" 
                                image="/assets/medal.png"> 
                            </CardMedia> */}
                        <Typography style={{fontWeight:'500', fontSize:'2vh', color:'#C94F48'}}>Итоговые баллы: 2500</Typography>
                    </Box>
                </Stack>
                <List style={{maxHeight: '30vh', width:'100%', overflowY: 'scroll', overflowX:'hidden', display:'flex', flexDirection:"column",  flexWrap:"nowrap", justifyContent:'space-between', marginBottom:'1.6vw', rowGap:'1vh'  }}>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Typography sx={{width:'11vh', paddingRight:'5vh'}}>2 место</Typography>
                                <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                                    <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                        <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                                    </Avatar>
                                    <Typography>Александр</Typography>
                                </Box>
                        </Box>
                        <Typography>2500</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>3 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Яков</Typography>
                        </Box>
                        </Box>
                        <Typography>2000</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>4 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Яков</Typography>
                        </Box>
                        </Box>
                        <Typography>800</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>5 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Яков</Typography>
                        </Box>
                        </Box>
                        <Typography>500</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>6 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Ян</Typography>
                        </Box>
                        </Box>
                        <Typography>800</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>7 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Евгения</Typography>
                        </Box>
                        </Box>
                        <Typography>800</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>8 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Александр</Typography>
                        </Box>
                        </Box>
                        <Typography>0</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>9 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            
                            <Typography>Яков</Typography>
                        </Box>
                        </Box>
                        <Typography>0</Typography>
                    </Box>
                    <Box sx={{width:'99%', display: 'flex', justifyContent:'space-between', flexDirection: 'row', columnGap:'6vw',  alignItems: 'center', paddingBottom:'1.1vw', paddingRight:'1vh'}}>
                    <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                        <Typography sx={{width:'11vh', paddingRight:'5vh'}}>10 место</Typography>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Avatar alt='avatar 1' variant='circular' sx={{ width: '5vh', height: '5vh', marginRight:'1vh'}} >
                                <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                            </Avatar>
                            <Typography>Яков</Typography>
                        </Box>
                        </Box>
                        <Typography>800</Typography>
                    </Box>
                </List>
                <Container maxWidth='md' sx={{position:'absolute', bottom:'1vh', left:'50%', marginRight:'-50%', transform:'translate(-50%, -50%)', alignItems:'center', margin:'0 auto', display: 'flex', flexDirection: 'row', justifyContent:'space-around', paddingBottom:'10px', gap: 1}}>
                    <Box display={isMobile ? 'none' : 'flex'}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={() => navigate(`/`)}>
                                Завершить игру
                        </Button>
                    </Box>
                    <Button 
                        variant='contained'
                        onClick={() => navigate(`/lobby/${nanoid()}`)}>
                            Играть снова
                    </Button>
                </Container>
            </Box>
           </Container>
        </Container>
    );
}
