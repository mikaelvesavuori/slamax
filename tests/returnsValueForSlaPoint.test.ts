import test from 'ava';

import { ServiceSlaData } from '../src/domain/interfaces/ServiceSla';
import { serviceSlaData } from '../src/domain/data/serviceSlaData';
import { CalculateMaxSlaUseCase } from '../src/usecases/CalculateMaxSlaUseCase';

/**
 * @description Verify that all SLA data points return their respective
 * values and can be run end-to-end, individually.
 * Additionally, `ava` will spot any duplicate test names (i.e. duplicates
 * of any keys).
 */
serviceSlaData.forEach((service: ServiceSlaData) => {
  const { name, sla } = service;

  test(`Returns value for ${name}`, (t) => {
    const fn = CalculateMaxSlaUseCase([{ name }]);
    t.is(fn, sla);
  });
});
