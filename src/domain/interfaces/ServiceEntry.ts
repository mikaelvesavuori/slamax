import { ServiceSla } from './ServiceSla';

/**
 * @description ServiceEntryInput is the input before creating the actual value objects.
 */
export type ServiceEntryInput = {
  /**
   * @description User-provided inputes.
   */
  userInputs: Record<string, any>[];
  /**
   * @description SLAs for services.
   */
  serviceSlas: ServiceSla[];
  /**
   * @description List of service names.
   */
  serviceNamesList: string[];
};

/**
 * @description ServiceEntry uses same shape as ServiceSla.
 */
export type ServiceEntry = ServiceSla;
