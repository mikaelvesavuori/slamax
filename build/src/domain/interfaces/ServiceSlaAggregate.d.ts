import { ServiceSla } from './ServiceSla';
import { ServiceEntry } from './ServiceEntry';
export declare type ServiceSlaAggregateInput = {
    serviceEntries: ServiceEntry[];
    serviceSlas: ServiceSla[];
    serviceNamesList: string[];
};
