import { Grid, List, ListItem, Typography } from '@mui/material';
import FlexBox from './FlexBox';
import DefaultAvatar from './DefaultAvatar';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../store/playerSlice';
import { Colors, GridRowsValues } from '../utils/utils';
import { selectGame } from '../store/gameSlice';

export default function RoomUserInfo() {
  const {player} = useSelector(selectPlayer);
  const {game} = useSelector(selectGame);

  return (
    <Grid 
      container 
      direction='column' 
      gap={GridRowsValues.GAP}>
      <Grid 
        item 
        height={GridRowsValues.UPPER_HEIGHT} 
        padding={'1vh'} 
        bgcolor={Colors.PANEL} 
        borderRadius='30px'>
        <FlexBox 
          direction='row' 
          sx={{alignItems: 'center'}}
          gap={0.5}>
            <DefaultAvatar src={player.avatar} width={'8vh'} userId={player.id}/>
            <FlexBox direction='column' alignItems='flex-start' sx={{paddingTop: 1}}>
              <Typography variant='h3' color={Colors.Text.HIGHLIGHT_MAJOR}>{player.name}</Typography>
              <Typography variant='body1' color={Colors.Text.HIGHLIGHT_MAJOR}>Очки: {player.score}</Typography>
            </FlexBox>
        </FlexBox>
      </Grid>

      <Grid 
        item 
        height={GridRowsValues.MIDDLE_AND_DOWN} 
        padding={'2vh'} 
        bgcolor={Colors.PANEL} 
        borderRadius='30px' 
        display={game.players.length < 2 ? 'none' : 'block'}>
        <FlexBox 
          direction='column'
          gap={1}
          padding={0}>
            <Typography width='100%' variant='caption'>Участники</Typography>
            <List style={{width:'100%', height: '48vh', overflowY: 'auto'}}>
              {game.players.map((p) => (
                <ListItem key={p.id} sx={{paddingX: 0, display: p.id === player.id ? 'none' : 'flex'}}>
                  <FlexBox direction='row' gap={0.5}>
                    <DefaultAvatar src={p.avatar} width={'8vh'} userId={p.id}/>
                    <Typography variant='body1'>{p.name}</Typography>
                  </FlexBox>
                </ListItem>
              ))}
            </List>
        </FlexBox>
      </Grid>
    </Grid>
  );
}
