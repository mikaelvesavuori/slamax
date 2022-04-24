import { ServiceSlaData } from '../interfaces/ServiceSla';

import slaDataAws from './aws.json';
import slaDataAzure from './azure.json';
import slaDataGcp from './gcp.json';

/**
 * @description Service SLAs.
 *
 * @see https://aws.amazon.com/legal/service-level-agreements/
 * @see https://azure.microsoft.com/en-us/support/legal/sla/summary/
 * @see https://cloud.google.com/terms/sla
 */
export const serviceSlaData: ServiceSlaData[] = [...slaDataAws, ...slaDataAzure, ...slaDataGcp];
