import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Game from "../utils/types/Game";
import { generateGame, generateRandomPlayers } from "../utils/mock";
import { AsyncThunkConfig, State } from "./store";
import AxiosInstance from "../utils/Axios";
import GameState from "../utils/types/GameState";
import Question from "../utils/types/Question";

//запросы делаются в этих функциях
const postCreateGame = createAsyncThunk<Game, void, AsyncThunkConfig>('game/createGame', async () => {
  const resp = await AxiosInstance.post('/room/');
  return resp.data as Game;
});

const getQuestion = createAsyncThunk<Question, number, AsyncThunkConfig>('game/getQuestion', async (questionId: number) => {
  const resp = await AxiosInstance.get(`/question/${questionId}/`);
  return resp.data as Question;
});

const initialGame: Game = {
  id: 0,
  code: '0',
  qr_code: '',
  is_started: false,
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
      state.game.is_started = true;
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
      .addCase(getQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.status = 'success';
        const questionIndex = state.game.questions.findIndex((q) => q.id === action.payload.id);

        if(questionIndex >= 0) {
          state.game.questions[questionIndex] = action.payload;
        }
      })
      .addCase(getQuestion.rejected, (state) => {
        state.status = 'error';
      })
  }
});

export const selectGame = (state: State) => state.game;
export const {joinGame, quitGame, startGame, changePlayer} = gameSlice.actions;
export {postCreateGame, getQuestion};
export default gameSlice.reducer;
