import PlayerResponce from "./PlayerResponce";

export default interface WebSocketCommand {
  command: 'join' | 'change_status' | 'start_game' | 'restart_game' | 'disconnect',
  info: string,
  username?: string,
  players?: Array<PlayerResponce>
}
