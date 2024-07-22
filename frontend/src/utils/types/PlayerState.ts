import Player from "./Player";
import { RequestStatus } from "./RequestStatus";

export default interface PlayerState {
  player: Player,
  status: RequestStatus
}
