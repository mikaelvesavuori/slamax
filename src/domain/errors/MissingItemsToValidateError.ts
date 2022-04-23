/**
 * @description Used when an there are no items to validate.
 */
export class MissingItemsToValidateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'MissingItemsToValidateError';
    console.error(message);
  }
}
