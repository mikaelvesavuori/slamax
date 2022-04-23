import test from 'ava';

import { InputNotAnArrayError } from '../src/domain/errors/InputNotAnArrayError';
import { InputTooBigError } from '../src/domain/errors/InputTooBigError';
import { InputTooManyObjectsError } from '../src/domain/errors/InputTooManyObjectsError';

import { validateInput } from '../src/infrastructure/validateInput';

/**
 * @description Verifies that validateInput functions as expected.
 */

test(`Validates input data and returns it if valid`, (t) => {
  const data = [{ name: 'aws-lambda' }];
  t.is(validateInput(data), data);
});

test(`Throws InputNotAnArrayError for empty input`, (t) => {
  // @ts-ignore
  const error = t.throws(() => validateInput(), {
    instanceOf: InputNotAnArrayError
  });

  // @ts-ignore
  t.is(error.message, 'Input is not an array!');
});

test(`Throws InputNotAnArrayError for object input`, (t) => {
  const error = t.throws(() => validateInput({}), {
    instanceOf: InputNotAnArrayError
  });

  // @ts-ignore
  t.is(error.message, 'Input is not an array!');
});

test(`Throws InputNotAnArrayError for numeric input`, (t) => {
  const error = t.throws(() => validateInput(123), {
    instanceOf: InputNotAnArrayError
  });

  // @ts-ignore
  t.is(error.message, 'Input is not an array!');
});

test(`Throws InputTooBigError for a payload that is too large`, (t) => {
  const error = t.throws(
    () =>
      validateInput([
        {
          '2050 characters':
            'akldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakldhp983dhp9a3hda9p3hdadakl1fh1hd1+p918hd+9h1dg1d08gsp9fuhs89hd091h298h1298hed9h128h'
        }
      ]),
    {
      instanceOf: InputTooBigError
    }
  );

  // @ts-ignore
  t.is(error.message, 'Input is too big!');
});

test(`Throws InputTooManyObjectsError when payload includes too many objects`, (t) => {
  const error = t.throws(
    () =>
      validateInput([
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ]),
    {
      instanceOf: InputTooManyObjectsError
    }
  );

  // @ts-ignore
  t.is(error.message, 'Input includes more than 30 objects!');
});
