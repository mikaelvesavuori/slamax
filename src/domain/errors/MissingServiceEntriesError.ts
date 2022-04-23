/**
 * @description Used when an there are no service entries entered.
 */
export class MissingServiceEntriesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingServiceEntriesError';
    console.error(message);
  }
}
