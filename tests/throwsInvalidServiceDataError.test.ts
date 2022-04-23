import test from 'ava';

import { createNewServiceSlas } from '../src/domain/valueObjects/ServiceSlas';

import { InvalidServiceDataError } from '../src/domain/errors/InvalidServiceDataError';

/**
 * @description Verifies that InvalidServiceDataError is thrown.
 */

test(`Throws InvalidServiceDataError`, (t) => {
  // @ts-ignore
  const error = t.throws(() => createNewServiceSlas({ serviceSlas: [{ asdf: 1 }] }), {
    instanceOf: InvalidServiceDataError
  });

  // @ts-ignore
  t.is(error.message, 'Service SLA data is invalid!');
});
