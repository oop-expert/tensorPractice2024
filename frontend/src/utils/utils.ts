export const WIDTH_RELATIVE_TO_SCREEN = '77%';

export const AVATAR_BG_COLORS = ['yellow', 'springgreen', 'blue', 'deeppink'];

export const getRandomInteger = (min: number, max: number): number => {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
