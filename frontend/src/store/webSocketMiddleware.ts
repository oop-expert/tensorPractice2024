import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { quitGame, startGame, updatePlayers } from "./gameSlice";
import WebSocketCommand from "../utils/types/WebSocketCommand";
import { getChangeStatusCommand, getRestartGameCommand, getStartGameCommand } from "./WebSocketCommands";
import Socket from "./Socket";
import WebSocketProps from "../utils/types/WebSocketProps";

export const WebSocketActionTypes = {
  JOIN_GAME: 'webSocket/joinGame',
  CHANGE_STATUS: 'webSocket/changeStatus',
  START_GAME: 'webSocket/startGame',
  RESTART_GAME: 'webSocket/restartGame',
  QUIT_GAME: 'webSocket/quitGame',
};

const isPayloadAction = (action: unknown): action is PayloadAction<WebSocketProps> => (action as PayloadAction<WebSocketProps>).payload !== undefined;

export const WebSocketMiddleware = 
  (socket: Socket<WebSocketCommand>): Middleware => 
  (params) => 
  (next) => 
  (action) => {

  const {dispatch} = params;
  
  if(isPayloadAction(action)) {

    switch(action.type) {
      case WebSocketActionTypes.JOIN_GAME: {
        socket.connect(`ws://127.0.0.1:8000/ws/room/${action.payload.gameCode}/?username=${action.payload.username}`);

        socket.onMessage((evt: MessageEvent<WebSocketCommand>) => {
          if(evt.data.command === 'start_game') {
            dispatch(startGame());
          } else {
            dispatch(updatePlayers(evt.data.players ?? []));
          }
        });

        socket.onClose(() => dispatch(quitGame()));

        break;
      }

      case WebSocketActionTypes.CHANGE_STATUS: {
        socket.send(getChangeStatusCommand(typeof action.payload.username === 'string' ? action.payload.username : ''));
        break;
      }

      case WebSocketActionTypes.START_GAME: {
        socket.send(getStartGameCommand(typeof action.payload.username === 'string' ? action.payload.username : ''));
        break;
      }

      case WebSocketActionTypes.RESTART_GAME: {
        socket.send(getRestartGameCommand(typeof action.payload.username === 'string' ? action.payload.username : ''));
        break;
      }

      case WebSocketActionTypes.QUIT_GAME: {
        socket.disconnect();
        break;
      }
    }
  }
  return next(action);
};
