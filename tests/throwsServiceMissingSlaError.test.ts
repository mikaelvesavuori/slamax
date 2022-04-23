import test from 'ava';

import { createNewServiceSlaAggregate } from '../src/domain/aggregates/ServiceSlaAggregate';

import { ServiceMissingSlaError } from '../src/domain/errors/ServiceMissingSlaError';

/**
 * @description Verifies that ServiceMissingSlaError is thrown.
 */

test(`Throws ServiceMissingSlaError`, (t) => {
  const aggregate = createNewServiceSlaAggregate({
    // @ts-ignore
    serviceEntries: [{ name: 'some-service' }],
    serviceSlas: [],
    serviceNamesList: []
  });

  const error = t.throws(() => aggregate.calculateMaxSla(), {
    instanceOf: ServiceMissingSlaError
  });

  // @ts-ignore
  t.is(error.message, 'Service is missing SLA!');
});
