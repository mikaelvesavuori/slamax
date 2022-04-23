import { InputNotAnArrayError } from '../domain/errors/InputNotAnArrayError';
import { InputTooBigError } from '../domain/errors/InputTooBigError';
import { InputTooManyObjectsError } from '../domain/errors/InputTooManyObjectsError';

/**
 * @description Basic input validation on the outer layer.
 */
export function validateInput(slaMaxInput: any): any {
  const MAX_ITEMS = 30;
  const MAX_SIZE = 2048;

  if (!Array.isArray(slaMaxInput)) throw new InputNotAnArrayError('Input is not an array!');
  if (slaMaxInput.length > MAX_ITEMS)
    throw new InputTooManyObjectsError('Input includes more than 30 objects!');
  if (JSON.stringify(slaMaxInput).length > MAX_SIZE)
    throw new InputTooBigError('Input is too big!');

  return slaMaxInput;
}
