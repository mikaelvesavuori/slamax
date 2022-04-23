/**
 * @description Input to SLAMAX.
 */
export type SlaMaxInput = {
  /**
   * @description Name of the service.
   */
  name: string;
  /**
   * @description Optional SLA of the service.
   */
  sla?: string;
  /**
   * @description Optional description of the service.
   */
  description?: string;
};
