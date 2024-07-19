export default interface Player {
  id: number,
  name: string,
  avatar: string,
  isHost: boolean,
  isReady: boolean,
  score: number,
  createdAt: string,
  isRight: boolean
}
