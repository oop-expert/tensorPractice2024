import Player from "./types/Player";
import PlayerResponce from "./types/PlayerResponce";

export const WIDTH_RELATIVE_TO_SCREEN = '70vw';

export const CODE_LENGTH = 8;
export const MAX_PLAYERS = 10;

export const AVATAR_BG_COLORS = ['yellow', 'springgreen', 'blue', 'deeppink'];

export const Colors = {
  BACKGROUND: '#FFEFD9',
  PANEL: '#FDD59C',
  TRANSPARENT: 'rgba(0, 0, 0, 0)',
  PrimaryButton: {
    ACTIVE: '#C94F48',
    DISABLED: '#C94F4880',
    HOVERED: '#FFFFFF',
    CLICKED: '#FFCAC7'
  },
  SecondaryButton: {
    ACTIVE: '#F49C1E',
    DISABLED: '#F49C1E80',
    HOVERED: '#FFFFFF',
    CLICKED: '#FFE8C7'
  },
  Text: {
    PRIMARY: '#030625',
    SECONDARY: '#49454F',
    HIGHLIGHT_MAJOR: '#C94F48',
    HIGHLIGHT_MINOR: '#F49C1E',
    PLACEHOLDER: '#787878',
    ON_BUTTON: '#FFFFFF',
    DISABLED: '#787878'
  },
  VoidInput: {
    FILL: '#FFFFFF',
    OUTLINE: '#D4D5D7'
  },  
  ErrorInput: {
    FILL: '#FAEBEB',
    OUTLINE: '#F74D4D'
  },
  SuccessInput: {
    FILL: '#FFFFFF',
    OUTLINE: '#0DC268'
  },
  ScrollBar: {
    TRACK: '#FFFFFF',
    THUMB: '#F49C1E'
  }
};

export const AVATARS = Array.from({length: 6}, (_v, k) => new URL(`../assets/Avatar ${k + 1}.png`, import.meta.url).href);

export const getRandomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export const generateRandomId = (additionalNumber:number = 0) => Date.now() % 1000 + additionalNumber;

export const getPlayerFromResponce = (responce: PlayerResponce): Player => {
  const avatarId = !responce.avatar ? 0 : parseInt(responce.avatar);

  return ({
    id: responce.id,
    name: responce.name,
    avatar: AVATARS[avatarId],
    avatarId,
    isHost: responce.is_host,
    isReady: responce.is_ready,
    score: responce.score,
    createdAt: responce.created_at,
    isRight: false
  });
}