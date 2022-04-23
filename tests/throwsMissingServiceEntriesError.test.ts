import test from 'ava';

import { createNewServiceSlaAggregate } from '../src/domain/aggregates/ServiceSlaAggregate';

import { MissingServiceEntriesError } from '../src/domain/errors/MissingServiceEntriesError';

/**
 * @description Verifies that MissingServiceEntriesError is thrown.
 */

test(`Throws MissingServiceEntriesError`, (t) => {
  const aggregate = createNewServiceSlaAggregate({
    serviceEntries: [],
    serviceSlas: [],
    serviceNamesList: []
  });

  const error = t.throws(() => aggregate.calculateMaxSla(), {
    instanceOf: MissingServiceEntriesError
  });

  // @ts-ignore
  t.is(error.message, 'Missing service entries!');
});
