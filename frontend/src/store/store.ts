import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
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
export type AppDispatch = Store['dispatch'];
export type Thunk<Result = void> = ThunkAction<Result, State, unknown, Action<string>>;
export type AsyncThunkConfig = {dispatch: AppDispatch, state: State};
