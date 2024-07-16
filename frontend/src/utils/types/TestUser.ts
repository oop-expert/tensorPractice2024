export default interface TestUser {
  id: string;
  username: string;
  avatarColor: string;
  status: 'Готов' | 'Не готов' | '-'
}
