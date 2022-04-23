import { createNewServiceSlaAggregate } from '../domain/aggregates/ServiceSlaAggregate';
import { createNewServiceEntries } from '../domain/valueObjects/ServiceEntries';
import { createNewServiceSlas } from '../domain/valueObjects/ServiceSlas';
import { serviceSlaData } from '../domain/data/serviceSlaData';

/**
 * @description The complete use case for calculating the maximum SLA.
 */
export function CalculateMaxSlaUseCase(userInputs: any[]) {
  const ServiceSlas = createNewServiceSlas({ serviceSlas: serviceSlaData });
  const serviceSlas = ServiceSlas.getServiceSlas();
  const serviceNamesList = ServiceSlas.getServiceNames();

  const ServiceEntries = createNewServiceEntries({
    userInputs,
    serviceSlas,
    serviceNamesList
  });
  const serviceEntries = ServiceEntries.getServiceEntries();

  const serviceSlaAggregate = createNewServiceSlaAggregate({
    serviceEntries,
    serviceSlas,
    serviceNamesList
  });

  return serviceSlaAggregate.calculateMaxSla();
}
