import { ServiceSla } from './ServiceSla';
import { ServiceEntry } from './ServiceEntry';

/**
 * @description The input that ServiceSlaAggregate takes.
 */
export type ServiceSlaAggregateInput = {
  /**
   * @description List of service entries.
   */
  serviceEntries: ServiceEntry[];
  /**
   * @description Service SLAs.
   */
  serviceSlas: ServiceSla[];
  /**
   * @description List of service names.
   */
  serviceNamesList: string[];
};
