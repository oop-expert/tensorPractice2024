import Player from "./Player";
import Question from "./Question";

export default interface Game {
  id: number,
  code: string,
  qr_code: string,
  is_started: boolean,
  players: Array<Player>,
  questions: Array<Question>
}
