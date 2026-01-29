/**
 * Returns a random integer in the range [min, max).
 * @param min - inclusive lower bound
 * @param max - exclusive upper bound (must be greater than `min`)
 * @throws Error when `max <= min`
 */
export function getRandomInt(min: number, max: number): number {
  if (max <= min) {
    throw new Error('max must be greater than min');
  }

  return Math.floor(Math.random() * (max - min)) + min;
}
