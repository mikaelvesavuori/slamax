export type ServiceSlasInput = {
    serviceSlas: ServiceSlaData[];
};
export interface ServiceSla {
    name: string;
    sla: string;
    description?: string;
}
export interface ServiceSlaData {
    name: string;
    sla: number;
}
