import { ServiceEntryInput, ServiceEntry } from '../interfaces/ServiceEntry';
import { ServiceSla } from '../interfaces/ServiceSla';

import { UnknownInputError } from '../errors/UnknownInputError';
import { MissingItemsToValidateError } from '../errors/MissingItemsToValidateError';
import { InvalidServiceInputDataError } from '../errors/InvalidServiceInputDataError';

/**
 * @description Builder function to create a new ServiceEntries value object.
 */
export function createNewServiceEntries(serviceEntryInput: ServiceEntryInput) {
  const { userInputs, serviceSlas, serviceNamesList } = serviceEntryInput;
  return new ServiceEntries(userInputs, serviceSlas, serviceNamesList);
}

/**
 * @description The ServiceEntries value object class.
 */
class ServiceEntries {
  /**
   * Plain list of service names as strings.
   * Used as a convenience to lookup names when validating.
   */
  serviceNamesList: string[];
  /**
   * Constructed and validated service entries, built from user input and using SLA data.
   */
  serviceEntries: ServiceEntry[];
  /**
   * Services and their SLAs.
   */
  serviceSlas: ServiceSla[];

  constructor(
    userInputs: Record<string, any>[],
    serviceSlas: ServiceSla[],
    serviceNamesList: string[]
  ) {
    this.serviceNamesList = serviceNamesList;

    const isServiceInputDataValid = this.validateListOfItems(userInputs);
    if (!isServiceInputDataValid)
      throw new InvalidServiceInputDataError('Service input data is invalid!');

    this.serviceSlas = serviceSlas;
    this.serviceEntries = this.constructServiceEntries(userInputs);
  }

  /**
   * @description Higher-level utility to validate lists of items.
   */
  private validateListOfItems(items: Record<string, any>[]): boolean {
    if (!items || items.length === 0)
      throw new MissingItemsToValidateError('Missing items in list to validate!');

    const results = items.map((service: any) => this.validateEntry(service));

    return results.includes(false) ? false : true;
  }

  /**
   * @description Validate user input (service entry).
   */
  private validateEntry(service: Record<string, any>): boolean {
    if (!service.name) return false;

    if (service.name.toLowerCase().startsWith('custom') && service.sla && service.description)
      return true;

    if (!this.serviceNamesList.includes(service.name)) return false;

    return true;
  }

  /**
   * @description Constructs a valid service entry from user input.
   */
  private constructServiceEntries(userInputs: Record<string, any>[]): ServiceEntry[] {
    return userInputs.map((serviceInput: Record<string, any>) => {
      // Case: Custom service.
      if (serviceInput.name.startsWith('custom') && serviceInput.sla && serviceInput.description) {
        const { name, sla, description } = serviceInput;
        return {
          name,
          sla,
          description
        };
      }

      // Case: Regular item from list of known services with SLA.
      if (this.serviceNamesList.includes(serviceInput.name))
        return this.serviceSlas.filter(
          (serviceSla: any) => serviceSla.name === serviceInput.name
        )[0];

      throw new UnknownInputError(`Unknown input found: ${JSON.stringify(serviceInput)} `);
    });
  }

  /**
   * @description Get service entries.
   */
  public getServiceEntries() {
    return this.serviceEntries;
  }
}
