import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Game from "../utils/types/Game";
import { generateGame, generateRandomPlayers } from "../utils/mock";
import { AsyncThunkConfig, State } from "./store";
import AxiosInstance from "../utils/Axios";
import GameState from "../utils/types/GameState";

//запросы делаются в этих функциях
const postCreateGame = createAsyncThunk<Game, void, AsyncThunkConfig>('game/createGame1', async () => {
  const resp = await AxiosInstance.post('/room/');
  return resp.data as Game;
});

const initialGame: Game = {
  id: 0,
  code: '0',
  qrCode: '',
  isStarted: false,
  players: [],
  questions: []
};

const initialState: GameState = {
  game: initialGame, 
  status: 'idle'
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    joinGame: (state, action) => {
      state.game = generateGame(generateRandomPlayers(), action.payload.code);
      state.game.players.push(action.payload.player);
    },
    quitGame: (state) => {
      state.game = initialGame;
    },
    startGame: (state) => {
      state.game.isStarted = true;
    },
    changePlayer: (state, action) => {
      const playerIndex = state.game.players.findIndex((p) => p.id === action.payload);

      if(playerIndex >= 0) {
        state.game.players[playerIndex].isReady = true;
      }
    }
  },
  //здесь задаются дейтсвия при выполнении запроса
  extraReducers(builder) {
    builder
      .addCase(postCreateGame.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCreateGame.fulfilled, (state, action) => {
        state.status = 'success';
        state.game = action.payload;
      })
      .addCase(postCreateGame.rejected, (state) => {
        state.status = 'error';
      })
  }
});

export const selectGame = (state: State) => state.game;
export const {joinGame, quitGame, startGame, changePlayer} = gameSlice.actions;
export {postCreateGame};
export default gameSlice.reducer;
