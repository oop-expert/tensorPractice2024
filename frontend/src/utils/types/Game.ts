import Player from "./Player";
import Question from "./Question";

export default interface Game {
  id: number,
  code: string,
  qrCode: string,
  isStarted: boolean,
  players: Array<Player>,
  questions: Array<Question>
}
