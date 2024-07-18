import { configureStore } from "@reduxjs/toolkit";
import PopupReducer from './popupSlice';
import GameReducer from './gameSlice';
import PlayerReducer from './playerSlice';

export const store = configureStore({
  reducer: {
    popup: PopupReducer,
    game: GameReducer,
    player: PlayerReducer
  }
});

export type Store = typeof store;
export type State = ReturnType<Store['getState']>;
export type Dispatch = Store['dispatch'];
