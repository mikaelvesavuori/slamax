import test from 'ava';

import { CalculateMaxSlaUseCase } from '../src/usecases/CalculateMaxSlaUseCase';

/**
 * @description Verifies that custom inputs can be calculated.
 */

test(`Takes custom inputs`, (t) => {
  const slas = [
    {
      name: 'aws-lambda',
      sla: 99.95
    },
    {
      name: 'amazon-api-gateway',
      sla: 99.95
    },
    {
      name: 'custom-service1',
      description: 'My custom service',
      sla: 99
    },
    {
      name: 'custom-service2',
      description: 'My other custom service',
      sla: 95
    }
  ];

  const expected = 93.956;

  const fn = CalculateMaxSlaUseCase(slas);
  t.is(fn, expected);
});
