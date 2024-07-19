import Player from "./Player";

export default interface PlayerState {
  player: Player,
  status: 'idle' | 'loading' | 'error' | 'success'
}
