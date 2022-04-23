import { ServiceEntryInput, ServiceEntry } from '../interfaces/ServiceEntry';
import { ServiceSla } from '../interfaces/ServiceSla';
export declare function createNewServiceEntries(serviceEntryInput: ServiceEntryInput): ServiceEntries;
declare class ServiceEntries {
    serviceNamesList: string[];
    serviceEntries: ServiceEntry[];
    serviceSlas: ServiceSla[];
    constructor(userInputs: Record<string, any>[], serviceSlas: ServiceSla[], serviceNamesList: string[]);
    private validateListOfItems;
    private validateEntry;
    private constructServiceEntries;
    getServiceEntries(): ServiceSla[];
}
export {};
