import { ServiceSlasInput, ServiceSla } from '../interfaces/ServiceSla';
export declare function createNewServiceSlas(serviceSlasInput: ServiceSlasInput): ServiceSlas;
declare class ServiceSlas {
    serviceNamesList: string[];
    serviceSlas: ServiceSla[];
    constructor(serviceSlas: any[]);
    private validateListOfItems;
    private validateServiceSla;
    getServiceSlas(): ServiceSla[];
    getServiceNames(): string[];
}
export {};
