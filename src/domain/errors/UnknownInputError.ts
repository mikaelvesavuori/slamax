/**
 * @description Used when an unknown service input is encountered.
 */
export class UnknownInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnknownInputError';
    console.error(message);
  }
}
