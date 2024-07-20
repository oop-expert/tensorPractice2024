import WebSocketCommand from '../utils/types/WebSocketCommand';

export const getChangeStatusCommand = (username: string): WebSocketCommand => ({
  command: 'change_status',
  info: `${username} changed status`
});

export const getStartGameCommand = (username: string): WebSocketCommand => ({
  command: 'start_game',
  info: `${username} start game`
});

export const getRestartGameCommand = (username: string): WebSocketCommand => ({
  command: 'restart_game',
  info: `${username} restart game`
});
