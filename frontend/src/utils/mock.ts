import { nanoid } from 'nanoid';
import Game from './types/Game';
import Player from './types/Player';
import { AVATARS, CODE_LENGTH, generateRandomId, getRandomInteger, MAX_PLAYERS } from './utils';
import TestQrCode from '../assets/test_qr_code.png';
import Question from './types/Question';
import { faker } from '@faker-js/faker/locale/ru';
import TestPic from '../assets/testpic.png';

const FILMS = ['Побег из Шоушенка', 'Зеленая миля', 'Властелин Колец', 'Крестный отец', 
  'Начало', 'Темный рыцарь', '1+1', 'Форрест Гамп', 'Унесенные призраками', 'Криминальное чтиво'];

const generateQuestions = () => FILMS.map((film, i) => {
  const question: Question = {
    id: i,
    image: TestPic,
    answer: film
  }

  return question;
});

export const generateRandomPlayers = (): Array<Player> => Array.from({length: getRandomInteger(1, MAX_PLAYERS - 1)}, (_v, i) => {
  const player: Player = {
    id: generateRandomId(i + 1),
    name: faker.person.firstName(),
    avatar: AVATARS[getRandomInteger(0, AVATARS.length - 1)],
    avatarId: getRandomInteger(0, AVATARS.length - 1),
    isHost: i === 0,
    isReady: true,
    score: 0,
    createdAt: new Date().toString()
  };

  return player;
});

export const generateGame = (players: Array<Player>, code?: string): Game => ({
  id: generateRandomId(),
  code: code ?? nanoid(CODE_LENGTH),
  qr_code: TestQrCode,
  is_started: false,
  players,
  questions: generateQuestions()
});

export const mockPlayers = generateRandomPlayers();
export const mockPlayer = mockPlayers[0];
export const mockGame = generateGame(mockPlayers);
