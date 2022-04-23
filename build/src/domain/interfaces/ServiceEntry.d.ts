import { ServiceSla } from './ServiceSla';
export declare type ServiceEntryInput = {
    userInputs: Record<string, any>[];
    serviceSlas: ServiceSla[];
    serviceNamesList: string[];
};
export declare type ServiceEntry = ServiceSla;
