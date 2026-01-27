export function getRandomInt(min: number, max: number): number {
  if (max <= min) {
    throw new Error('max must be greater than min');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
