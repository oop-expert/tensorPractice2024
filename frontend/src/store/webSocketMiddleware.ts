import { Middleware, PayloadAction } from "@reduxjs/toolkit";
import { quitGame, setError, startGame, updatePlayers } from "./gameSlice";
import WebSocketCommand from "../utils/types/WebSocketCommand";
import { getChangeStatusCommand, getErrorMessage, getRestartGameCommand, getStartGameCommand } from "./WebSocketCommands";
import Socket from "./Socket";
import WebSocketProps from "../utils/types/WebSocketProps";
import { changePlayer } from "./playerSlice";
import PlayerResponce from "../utils/types/PlayerResponce";

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
        socket.connect(`ws://51.250.36.21:8000/ws/room/${action.payload.gameCode}/?username=${action.payload.username}&avatar_id=${action.payload.avatarId}`);

        socket.onMessage((evt: MessageEvent) => {
          const data = JSON.parse(evt.data);
          if(data.command === 'start_game') {
            dispatch(startGame());
          } else {
            const player = data.players.find((p: PlayerResponce) => p.name === action.payload.username);
            if(player) {
              dispatch(changePlayer(player));
            }

            dispatch(updatePlayers(data.players ?? []));
          }
        });

        socket.onClose((evt: CloseEvent) => {
          dispatch(setError({code: evt.code, message: getErrorMessage(evt.code)}));
        });

        break;
      }

      case WebSocketActionTypes.CHANGE_STATUS: {
        socket.send(getChangeStatusCommand(action.payload.username));
        break;
      }

      case WebSocketActionTypes.START_GAME: {
        socket.send(getStartGameCommand(action.payload.username));
        break;
      }

      case WebSocketActionTypes.RESTART_GAME: {
        socket.send(getRestartGameCommand(action.payload.username));
        break;
      }

      case WebSocketActionTypes.QUIT_GAME: {
        socket.disconnect();
        dispatch(quitGame());
        break;
      }
    }
  }
  return next(action);
};
