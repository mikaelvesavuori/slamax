/**
 * @description Input to ServiceSlas.
 */
export type ServiceSlasInput = {
  /**
   * @description List of ServiceSlaData items.
   */
  serviceSlas: ServiceSlaData[];
};

/**
 * @description ServiceSla item.
 */
export interface ServiceSla {
  /**
   * @description Name of the service.
   */
  name: string;
  /**
   * @description SLA of the service.
   */
  sla: string;
  /**
   * @description Optional description of the service.
   */
  description?: string;
}

/**
 * @description ServiceSlaData item.
 */
export interface ServiceSlaData {
  /**
   * @description Name of the service.
   */
  name: string;
  /**
   * @description SLA of the service.
   */
  sla: number;
}
