/**
 * @description Used when a service data input is erroneous.
 */
export class InvalidServiceInputDataError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidServiceInputDataError';
    console.error(message);
  }
}
