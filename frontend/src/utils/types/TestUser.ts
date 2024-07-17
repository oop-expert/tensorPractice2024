export default interface TestUser {
  id: string;
  username: string;
  avatar: string;
  status: 'Готов' | 'Не готов' | '-'
}
