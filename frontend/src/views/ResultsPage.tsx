import { Avatar, Box, Button, Container, List, Stack, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate} from "react-router-dom";
import { useMediaMatch } from '../hooks/useMobileMatch';
import { useSelector } from "react-redux";
import { getGameByCode, postCreateGame, selectGame } from "../store/gameSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../store/storeHooks";
import Player from "../utils/types/Player";
import { WebSocketActionTypes } from "../store/webSocketMiddleware";
import QuitGamePopup from "../components/QuitGamePopup";
import { signUp } from "../store/playerSlice";


export default function ResultsPage(){
    const navigate = useNavigate();
    const {isMobile} = useMediaMatch();
    const dispatch = useAppDispatch();
    const {game} = useSelector(selectGame)

    useEffect(() => {
        dispatch(getGameByCode( game.code));
    }, [dispatch,  game.code]);

    useEffect(() => {
        if(game.id <= 0) {
            navigate('/');
        } else if(!game.is_started) {
            dispatch({type: WebSocketActionTypes.RESTART_GAME, payload: {gameCode: game.code, username: '', avatarId: 0}});
            navigate(`/lobby/${game.code}`);
        }
    }, [game.is_started, game.code, game.id, dispatch, navigate])


    const quitGame = () => {
        dispatch({type: WebSocketActionTypes.QUIT_GAME, payload: {gameCode: game.code, username: '', avatarId: 0}});
        navigate(`/`);
    }

    console.log(game)
    const onGameCreate = () => {
        navigate(`/`);
        dispatch(signUp(true));
        dispatch(postCreateGame());
        if(game.id > 0) {
            navigate(`/lobby/${game.id}`);
            navigate(`/`);
        }
    };
    const players = game.players
    console.log(players)
    let firstPlace
    let playersFiltered
    
    if(players.length !== 0 ){
        if(players.length > 1){
            playersFiltered = [...players].sort((a, b) => Number(a.score) - Number(b.score)).reverse();
            firstPlace = playersFiltered.splice(0,1)
            console.log(firstPlace)
            console.log(playersFiltered)
        }
        console.log(players)
    }
    console.log(firstPlace)
    return(
        <Box className='app'>
            <Box className='app__top-content'>
            <Typography variant='h1' sx={{marginTop:'36px', borderRadius:'25px', padding:'14px 29px', backgroundColor:'#FDD59C'}}>Результаты игры</Typography>
        {/* <Container maxWidth='lg' sx={{padding: '1.3vh', borderRadius: 5, display: 'flex', flexDirection: 'column', flexWrap: 'wrap'}}> */}
          {/* <Container maxWidth='lg' sx={{display: 'flex', padding: '0vw', flexDirection: 'row',justifyContent:'center', alignItems: 'center', gap:'2px'}}> */}
            {/* <Box sx={{display: 'flex', fontSize:'2vh',flexDirection: 'column', width:'70%',  alignItems: 'center'}}> */}
                {(players.length === 1)?
                    <Stack direction={isMobile ? 'column' : 'row'}  sx={{display:'flex', alignItems:'center', marginTop:'32px', width:'100%'}}>
                        <Avatar alt='avatar 1' variant='circular' src={players[0].avatar}  sx={{ width: '222px', height: '222px'}} >
                            <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                        </Avatar>
                        <Box alignItems={isMobile ? 'center' : 'flex-start'} sx={{marginTop:'19px', display:'flex', flexDirection:'column'}}>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                                <Typography style={{fontWeight:'500', fontSize:'28px', color:'#C94F48'}}>{players[0].name}</Typography>
                                <Box display={isMobile ? 'none' : 'flex'}><img width={'50px'} height={'50px'} src="/medal.png" /></Box>
                            </Box>
                            <Typography style={{fontWeight:'500', fontSize:'21px', marginTop:'17px', color:'#C94F48'}}>Итоговые баллы: {players[0].score}</Typography>
                        </Box>
                    </Stack>
                    :<>
                        {(firstPlace !== undefined && playersFiltered !== undefined)?
                        <Box><Stack direction={isMobile ? 'column' : 'row'}  sx={{display:'flex', alignItems:'center', marginTop:'32px', width:'100%'}}>
                        <Avatar alt='avatar 1' variant='circular' src={firstPlace[0].avatar}  sx={{ width: '222px', height: '222px'}} >
                            <PersonIcon sx={{color: 'black', width: '10vh', height: '10vh'}}/>
                        </Avatar>
                        <Box alignItems={isMobile ? 'center' : 'flex-start'} sx={{marginTop:'19px', display:'flex', flexDirection:'column'}}>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
                                <Typography style={{fontWeight:'500', fontSize:'28px', color:'#C94F48'}}>{firstPlace[0].name}</Typography>
                                <Box display={isMobile ? 'none' : 'flex'}><img width={'50px'} height={'50px'} src="/medal.png" /></Box>
                            </Box>
                            <Typography style={{fontWeight:'500', fontSize:'21px', marginTop:'17px', color:'#C94F48'}}>Итоговые баллы: {firstPlace[0].score}</Typography>
                        </Box>
                    </Stack>
                    <List style={{maxHeight: '184px', overflowY: 'auto', overflowX:'hidden', display:'flex', flexDirection:"column", justifyContent:'space-between',padding:0, marginTop:'31px', rowGap:'32px'}}>
                    {(playersFiltered.map((player: Player, place: number)=>
                        <Box sx={{display: 'flex', paddingRight:'16px', justifyContent:'space-between', flexDirection: 'row', alignItems: 'center', }}>
                        <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                            <Typography variant="h4" sx={{width:'11vh', paddingRight:'14px'}}>{place+2} место</Typography>
                                <Box sx={{flexDirection: 'row',display: 'flex', alignItems:'center'}}>
                                    <Avatar alt='avatar 1' variant='circular' src={player.avatar} sx={{ width: '40px', height: '40px', marginRight:'12px'}} >
                                        <PersonIcon sx={{color: 'black', width: '3vh', height: '3vh'}}/>
                                    </Avatar>
                                    <Typography>{player.name}</Typography>
                                </Box>
                        </Box>
                        <Typography>{player.score}</Typography>
                    </Box>
                    ))}
                    </List>
                        </Box>:<Typography>Игроки не найдены</Typography>}
                    </>
                    }
                </Box>
                    
                
                <Container maxWidth='md' sx={{alignItems:'center', marginBottom:'35px', marginTop:'32px', display: 'flex', flexDirection: 'row', justifyContent:'space-around', paddingBottom:'10px', gap: 1}}>
                    <Box display={isMobile ? 'none' : 'flex'}>
                        <Button
                            variant='contained'
                            color="secondary"
                            onClick={quitGame}>
                                Завершить игру
                        </Button>
                    </Box>
                    <Button 
                        variant='contained'
                        onClick={onGameCreate}>
                            Играть снова
                    </Button>
                </Container>
            {/* </Box> */}
            <QuitGamePopup quitGame={quitGame}/>
           {/* </Container> */}
        </Box>
    );
}
