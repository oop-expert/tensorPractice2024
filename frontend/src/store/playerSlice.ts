import { createSlice } from '@reduxjs/toolkit';
import Player from '../utils/types/Player';
import { State } from './store';

const initialPlayer: Player = {
  id: 0,
  name: '',
  avatar: '',
  isHost: false,
  isReady: false,
  score: 0,
  createdAt: new Date().toString()
};

const platerSlice = createSlice({
  name: 'player',
  initialState: {player: initialPlayer},
  reducers: {
    signUp: (state, action) => {
      state.player = action.payload;
    },
    setReady: (state) => {
      state.player.isReady = true;
    },
    countScore: (state, action) => {
      state.player.score += action.payload * 10 + 100;
    }
  }
});

export const selectPlayer = (state: State) => state.player.player;
export const {signUp, setReady, countScore} = platerSlice.actions;
export default platerSlice.reducer;
