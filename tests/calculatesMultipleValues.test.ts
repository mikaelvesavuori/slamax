import test from 'ava';

import { CalculateMaxSlaUseCase } from '../src/usecases/CalculateMaxSlaUseCase';

/**
 * @description Verifies that multiple values can be calculated.
 */

test(`Calculates multiple values`, (t) => {
  const slas = [
    {
      name: 'aws-lambda',
      sla: 99.95
    },
    {
      name: 'amazon-api-gateway',
      sla: 99.95
    }
  ];

  const expected = 99.9;

  const fn = CalculateMaxSlaUseCase(slas);
  t.is(fn, expected);
});
