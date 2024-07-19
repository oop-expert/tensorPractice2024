import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Player from '../utils/types/Player';
import { AsyncThunkConfig, State } from './store';
import PlayerState from '../utils/types/PlayerState';
import Answer from '../utils/types/Answer';
import AxiosInstance from '../utils/Axios';
import Score from '../utils/types/Score';

const initialPlayer: Player = {
  id: 0,
  name: '',
  avatar: '',
  isHost: false,
  isReady: false,
  score: 0,
  createdAt: new Date().toString(),
  isRight: false
};

const initialState: PlayerState = {
  player: initialPlayer,
  status: 'idle'
};

const patchAnswer = createAsyncThunk<Score, Answer, AsyncThunkConfig>('player/sendAnswer', async (answer: Answer) => {
  const resp = await AxiosInstance.patch('/player/calculate-score/', answer);
  return resp.data as Score;
});

const platerSlice = createSlice({
  name: 'player',
  initialState: initialState,
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
  },
  extraReducers(builder) {
    builder
      .addCase(patchAnswer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(patchAnswer.fulfilled, (state, action) => {
        state.status = 'success';
        state.player.isRight = action.payload.isRight;
        state.player.score = action.payload.score;
      })
  }
});

export const selectPlayer = (state: State) => state.player.player;
export const {signUp, setReady, countScore} = platerSlice.actions;
export {patchAnswer};
export default platerSlice.reducer;
