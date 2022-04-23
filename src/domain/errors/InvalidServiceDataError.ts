/**
 * @description Used when a service data input is erroneous.
 */
export class InvalidServiceDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidServiceDataError';
    console.error(message);
  }
}
