import Game from './Game';
import { RequestStatus } from './RequestStatus';

export default interface GameState {
  game: Game,
  questionIndex: number,
  status: RequestStatus,
  generatingStatus: RequestStatus,
  errorCode: string | undefined,
  errorMessage: string | undefined
}
