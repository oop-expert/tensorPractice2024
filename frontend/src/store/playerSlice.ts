import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Player from '../utils/types/Player';
import { AsyncThunkConfig, State } from './store';
import PlayerState from '../utils/types/PlayerState';
import Answer from '../utils/types/Answer';
import AxiosInstance from '../utils/Axios';
import Score from '../utils/types/Score';
import { AVATARS, generateRandomId, getPlayerFromResponce } from '../utils/utils';

const initialPlayer: Player = {
  id: 0,
  name: '',
  avatar: '',
  avatarId: 0,
  isHost: false,
  isReady: false,
  score: 0,
  createdAt: new Date().toString()
};

const initialState: PlayerState = {
  player: initialPlayer,
  answerStatus: 'idle'
};

const generatePlayer = (isHost: boolean, name: string, avatarId: number): Player => ({
  id: generateRandomId(),
  name,
  avatar: AVATARS[avatarId],
  avatarId,
  isHost,
  isReady: false,
  score: 0,
  createdAt: new Date().toString()
});


const patchAnswer = createAsyncThunk<Score, Answer, AsyncThunkConfig>('player/sendAnswer', async (answer: Answer) => {
  const resp = await AxiosInstance.patch('/player/calculate-score/', answer);
  return resp.data as Score;
});

const platerSlice = createSlice({
  name: 'player',
  initialState: initialState,
  reducers: {
    setInfo: (state, action) => {
      state.player.name = action.payload.name;
      state.player.avatar = action.payload.avatar;
      state.player.avatarId = action.payload.avatarId;
    },
    signUp: (state, action) => {
      state.player = generatePlayer(action.payload, state.player.name, state.player.avatarId);
    },
    setReady: (state) => {
      state.player.isReady = true;
    },
    countScore: (state, action) => {
      state.player.score += action.payload * 10 + 100;
    },
    changePlayer: (state, action) => {
      state.player = getPlayerFromResponce(action.payload);
    },
    resetAnswerStatus: (state) => {
      state.answerStatus = 'idle';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(patchAnswer.pending, (state) => {
        state.answerStatus = 'loading';
      })
      .addCase(patchAnswer.fulfilled, (state, action) => {
        state.answerStatus = action.payload.is_right ? 'success' : 'incorrect';
        state.player.score = action.payload.score;
      })
      .addCase(patchAnswer.rejected, (state) => {
        state.answerStatus = 'error';
      })
  }
});

export const selectPlayer = (state: State) => state.player;
export const {setInfo, signUp, setReady, countScore, changePlayer, resetAnswerStatus} = platerSlice.actions;
export {patchAnswer};
export default platerSlice.reducer;
