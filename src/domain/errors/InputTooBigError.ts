/**
 * @description Used when an input is too big.
 */
export class InputTooBigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputTooBigError';
    console.error(message);
  }
}
