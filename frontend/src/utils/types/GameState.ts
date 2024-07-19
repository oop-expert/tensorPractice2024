import Game from './Game';

export default interface GameState {
  game: Game,
  status: 'idle' | 'loading' | 'error' | 'success'
}
