import { ServiceSlaAggregateInput } from '../interfaces/ServiceSlaAggregate';
import { ServiceSla } from '../interfaces/ServiceSla';
import { ServiceEntry } from '../interfaces/ServiceEntry';

import { MissingServiceEntriesError } from '../errors/MissingServiceEntriesError';
import { ServiceMissingSlaError } from '../errors/ServiceMissingSlaError';

/**
 * @description Factory/builder function to return a new ServiceSlaAggregate.
 */
export function createNewServiceSlaAggregate(
  serviceSlaAggregateInput: ServiceSlaAggregateInput
): any {
  const { serviceEntries, serviceSlas, serviceNamesList } = serviceSlaAggregateInput;
  return new ServiceSlaAggregate(serviceEntries, serviceSlas, serviceNamesList);
}

/**
 * @description The ServiceSlaAggregate handles service SLAs and logic around their data and calculations.
 */
class ServiceSlaAggregate {
  /**
   * Constructed and validated service entries, built from user input and using SLA data.
   */
  serviceEntries: ServiceEntry[];
  /**
   * Services and their SLAs.
   */
  serviceSlas: ServiceSla[];
  /**
   * Plain list of service names as strings.
   * Used as a convenience to lookup names when validating.
   */
  serviceNamesList: string[];

  constructor(
    serviceEntries: ServiceEntry[],
    serviceSlas: ServiceSla[],
    serviceNamesList: string[]
  ) {
    this.serviceEntries = serviceEntries;
    this.serviceSlas = serviceSlas;
    this.serviceNamesList = serviceNamesList;
  }

  /**
   * @description Utility to get matching service SLA from provided service entries.
   */
  private getServiceSlasFromEntries(): number[] {
    const serviceEntries = this.serviceEntries;
    if (!serviceEntries || serviceEntries.length === 0)
      throw new MissingServiceEntriesError('Missing service entries!');

    return serviceEntries.map((service: ServiceSla) => {
      if (!service.sla) throw new ServiceMissingSlaError('Service is missing SLA!');
      return parseFloat(service.sla);
    });
  }

  /**
   * @description Calculates maximum SLA from an array of provided numbers.
   */
  public calculateMaxSla(): number {
    const slas = this.getServiceSlasFromEntries();
    const total = slas.reduce(
      (prevValue: number, currentValue: number): number =>
        (prevValue = (currentValue * prevValue) / 100)
    );
    return parseFloat(total.toPrecision(5));
  }
}
