import test from 'ava';

import { createNewServiceSlas } from '../src/domain/valueObjects/ServiceSlas';

import { MissingItemsToValidateError } from '../src/domain/errors/MissingItemsToValidateError';

/**
 * @description Verifies that MissingItemsToValidateError is thrown.
 */

test(`Throws MissingItemsToValidateError`, (t) => {
  // @ts-ignore
  const error = t.throws(() => createNewServiceSlas({ serviceSlas: [] }), {
    instanceOf: MissingItemsToValidateError
  });

  // @ts-ignore
  t.is(error.message, 'Missing items in list to validate!');
});
