/**
 * @description Used when an input is not an array.
 */
export class InputNotAnArrayError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputNotAnArrayError';
    console.error(message);
  }
}
