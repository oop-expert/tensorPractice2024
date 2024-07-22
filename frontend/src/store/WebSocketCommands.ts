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

export const getErrorMessage = (errorCode: number) => {
  switch(errorCode) {
    case 4001: 
      return 'Необходимо указать имя';

    case 4002:
      return 'Игрок с таким же именем уже присутствует в игре';

    case 4003: 
      return 'Игра уже началась';

    case 4004:
      return 'Не удалось найти эту комнату с игрой'

    default: 
      return '';
  }
};
