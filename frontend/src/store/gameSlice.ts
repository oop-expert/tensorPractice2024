import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Game from "../utils/types/Game";
import { AsyncThunkConfig, State } from "./store";
import AxiosInstance from "../utils/Axios";
import GameState from "../utils/types/GameState";
import Question from "../utils/types/Question";
import { getPlayerFromResponce } from "../utils/utils";
import PlayerResponce from "../utils/types/PlayerResponce";

const isPlayerResponce = (responce: unknown): responce is PlayerResponce => (responce as PlayerResponce).is_host !== undefined;

export const isGame = (game: unknown): game is Game => (game as Game).code !== undefined;

//запросы делаются в этих функциях
const postCreateGame = createAsyncThunk<Game, void, AsyncThunkConfig>('game/createGame', async () => {
  const resp = await AxiosInstance.post('/room/');
  return resp.data as Game;
});

const getGameByCode = createAsyncThunk<Game, string, AsyncThunkConfig>('game/getGame', async (gameCode: string) => {
  const resp = await AxiosInstance.get(`/room/${gameCode}`);
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
  status: 'idle',
  questionIndex: 0,
  generatingStatus: 'idle',
  errorCode: undefined,
  errorMessage: undefined
}

const gameSlice = createSlice({
  name: 'game',
  initialState: initialState,
  reducers: {
    quitGame: (state) => {
      state.game = initialGame;
    },
    startGame: (state) => {
      state.game.is_started = true;
    },
    updatePlayers: (state, action) => {
      const players = action.payload.map((player: PlayerResponce) => getPlayerFromResponce(player));
      state.game.players = [...players];
      console.log(action.payload);
    },
    setError: (state, action) => {
      state.errorCode = action.payload.code.toString();
      state.errorMessage = action.payload.message;
    }
  },
  //здесь задаются дейтсвия при выполнении запроса
  extraReducers(builder) {
    builder
      .addCase(postCreateGame.pending, (state) => {
        state.status = 'loading';
        state.errorCode = undefined;
      })
      .addCase(postCreateGame.fulfilled, (state, action) => {
        state.status = 'success';
        state.game = action.payload;
        state.game.players = action.payload.players.map((player) => isPlayerResponce(player) ? getPlayerFromResponce(player) : player);
        state.errorCode = undefined;
      })
      .addCase(postCreateGame.rejected, (state, action) => {
        state.status = 'error';
        state.errorCode = action.error.code;
        state.errorMessage = 'Не получилось создать игру. Попробуйте ещё раз.';
      })
      .addCase(getGameByCode.pending, (state) => {
        state.status = 'loading'
        state.errorCode = undefined;
      })
      .addCase(getGameByCode.fulfilled, (state, action) => {
        state.status = 'success';
        state.game = action.payload;
        state.game.players = action.payload.players.map((player) => isPlayerResponce(player) ? getPlayerFromResponce(player) : player);
        state.errorCode = undefined;
      })
      .addCase(getGameByCode.rejected, (state, action) => {
        state.status = 'error';
        state.errorCode = action.error.code;
        state.errorMessage = 'Не получилось подключиться к игре. Попробуйте ещё раз.';
      })
      .addCase(getQuestion.pending, (state) => {
        state.status = 'loading';
        state.errorCode = undefined;
      })
      .addCase(getQuestion.fulfilled, (state, action) => {
        state.status = 'success';
        state.errorCode = undefined;
        const questionIndex = state.game.questions.findIndex((q) => q.id === action.payload.id);

        if(questionIndex >= 0) {
          state.game.questions[questionIndex] = action.payload;
        }
      })
      .addCase(getQuestion.rejected, (state, action) => {
        state.status = 'error';
        state.errorCode = action.error.code;
        state.errorMessage = 'Не удалось получить данные о вопросе.';
      })
  }
});

export const selectGame = (state: State) => state.game;
export const {quitGame, startGame, updatePlayers, setError} = gameSlice.actions;
export {postCreateGame, getGameByCode, getQuestion};
export default gameSlice.reducer;
