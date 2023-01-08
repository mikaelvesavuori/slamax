import { ServiceSla } from './ServiceSla';
import { ServiceEntry } from './ServiceEntry';
export type ServiceSlaAggregateInput = {
    serviceEntries: ServiceEntry[];
    serviceSlas: ServiceSla[];
    serviceNamesList: string[];
};
