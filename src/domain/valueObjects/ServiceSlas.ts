import { ServiceSlasInput, ServiceSla, ServiceSlaData } from '../interfaces/ServiceSla';

import { MissingItemsToValidateError } from '../errors/MissingItemsToValidateError';
import { InvalidServiceDataError } from '../errors/InvalidServiceDataError';

/**
 * @description Builder function to return new ServiceSlas value object.
 */
export function createNewServiceSlas(serviceSlasInput: ServiceSlasInput) {
  const { serviceSlas } = serviceSlasInput;
  return new ServiceSlas(serviceSlas);
}

/**
 * @description The ServiceSlas value object class.
 */
class ServiceSlas {
  /**
   * Plain list of service names as strings.
   * Used as a convenience to lookup names when validating.
   */
  serviceNamesList: string[];
  /**
   * Services and their SLAs.
   */
  serviceSlas: ServiceSla[];

  constructor(serviceSlas: any[]) {
    this.serviceNamesList = serviceSlas.map((service: ServiceSlaData) => service.name);
    const isServiceSlaDataValid = this.validateListOfItems(serviceSlas);
    if (!isServiceSlaDataValid) throw new InvalidServiceDataError('Service SLA data is invalid!');
    this.serviceSlas = serviceSlas;
  }

  /**
   * @description Higher-level utility to validate lists of items.
   */
  private validateListOfItems(items: Record<string, any>[]): boolean {
    if (!items || items.length === 0)
      throw new MissingItemsToValidateError('Missing items in list to validate!');

    const results = items.map((service: Record<string, any>) => this.validateServiceSla(service));

    return results.includes(false) ? false : true;
  }

  /**
   * @description Validate a service SLA.
   */
  private validateServiceSla(service: Record<string, any>): boolean {
    if (!service.name || !service.sla) return false;
    if (!this.serviceNamesList.includes(service.name)) return false;

    return true;
  }

  /**
   * @description Get service SLAs.
   */
  public getServiceSlas(): ServiceSla[] {
    return this.serviceSlas;
  }

  /**
   * @description Get service names.
   */
  public getServiceNames(): string[] {
    return this.serviceNamesList;
  }
}
