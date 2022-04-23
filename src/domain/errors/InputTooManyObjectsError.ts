/**
 * @description Used when an input contains too many objects.
 */
export class InputTooManyObjectsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InputTooManyObjectsError';
    console.error(message);
  }
}
