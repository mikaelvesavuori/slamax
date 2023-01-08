import { ServiceSla } from './ServiceSla';
export type ServiceEntryInput = {
    userInputs: Record<string, any>[];
    serviceSlas: ServiceSla[];
    serviceNamesList: string[];
};
export type ServiceEntry = ServiceSla;
