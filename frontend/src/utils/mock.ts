import { nanoid } from 'nanoid';
import Game from './types/Game';
import Player from './types/Player';
import { AVATARS, CODE_LENGTH, generateRandomId, getRandomInteger, MAX_PLAYERS } from './utils';
import TestQrCode from '../assets/test_qr_code.png';
import Question from './types/Question';
import { faker } from '@faker-js/faker/locale/ru';

const FILMS = ['Побег из Шоушенка', 'Зеленая миля', 'Властелин Колец', 'Крестный отец', 
  'Начало', 'Темный рыцарь', '1+1', 'Форрест Гамп', 'Унесенные призраками', 'Криминальное чтиво'];

const generateQuestions = () => FILMS.map((film, i) => {
  const question: Question = {
    id: i,
    image: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    answer: film
  }

  return question;
});

export const generateRandomPlayers = (): Array<Player> => Array.from({length: getRandomInteger(1, MAX_PLAYERS - 1)}, (_v, i) => {
  const player: Player = {
    id: generateRandomId(i + 1),
    name: faker.person.firstName(),
    avatar: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
    isHost: i === 0,
    isReady: getRandomInteger(0, 1) === 0,
    score: 0,
    createdAt: new Date().toString()
  };

  return player;
});

export const generateGame = (players: Array<Player>, code?: string): Game => ({
  id: generateRandomId(),
  code: code ?? nanoid(CODE_LENGTH),
  qrCode: TestQrCode,
  isStarted: false,
  players,
  questions: generateQuestions()
});