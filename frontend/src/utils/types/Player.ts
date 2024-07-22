export default interface Player {
  id: number,
  name: string,
  avatar: string,
  avatarId: number,
  isHost: boolean,
  isReady: boolean,
  score: number,
  createdAt: string,
  isRight: boolean
}
