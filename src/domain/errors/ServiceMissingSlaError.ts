/**
 * @description Used when a service is missing an SLA key/field.
 */
export class ServiceMissingSlaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ServiceMissingSlaError';
    console.error(message);
  }
}
