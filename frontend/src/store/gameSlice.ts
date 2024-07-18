import { createSlice } from "@reduxjs/toolkit";
import Game from "../utils/types/Game";
import { generateGame, generateRandomPlayers } from "../utils/mock";
import { State } from "./store";

const initialGame: Game = {
  id: 0,
  code: '0',
  qrCode: '',
  isStarted: false,
  players: [],
  questions: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState: {game: initialGame},
  reducers: {
    createGame: (state, action) => {
      state.game = generateGame([action.payload]);
    },
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
  }
});

export const selectGame = (state: State) => state.game.game;
export const {createGame, joinGame, quitGame, startGame, changePlayer} = gameSlice.actions;
export default gameSlice.reducer;
