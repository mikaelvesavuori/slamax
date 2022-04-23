import test from 'ava';

import { CalculateMaxSlaUseCase } from '../src/usecases/CalculateMaxSlaUseCase';

import { InvalidServiceInputDataError } from '../src/domain/errors/InvalidServiceInputDataError';

/**
 * @description Verifies that InvalidServiceInputDataError is thrown.
 */

test(`Throws InvalidServiceInputDataError`, (t) => {
  const slas = [
    {
      name: 'does-not-exist'
    }
  ];

  const error = t.throws(() => CalculateMaxSlaUseCase(slas), {
    instanceOf: InvalidServiceInputDataError
  });

  // @ts-ignore
  t.is(error.message, 'Service input data is invalid!');
});
