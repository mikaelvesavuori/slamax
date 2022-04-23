import { ServiceSlaData } from '../interfaces/ServiceSla';

import { slaDataAws } from './slaDataAws';
import { slaDataAzure } from './slaDataAzure';
import { slaDataGcp } from './slaDataGcp';

/**
 * @description Service SLAs.
 */
export const serviceSlaData: ServiceSlaData[] = [...slaDataAws, ...slaDataAzure, ...slaDataGcp];
