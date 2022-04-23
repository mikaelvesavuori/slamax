import { SlaMaxInput } from '../domain/interfaces/SlaMaxInput';
import { CalculateMaxSlaUseCase } from '../usecases/CalculateMaxSlaUseCase';
import { validateInput } from '../infrastructure/validateInput';

/**
 * @description Calculates maximum composite SLA for a list of sequentially provided cloud services.
 * Also, testing with custom-defined services/dependencies.
 *
 * @see https://alexewerlof.medium.com/calculating-composite-sla-d855eaf2c655
 */
export default function SlaMax(slaMaxInput: SlaMaxInput[]): number {
  try {
    const userInputs = validateInput(slaMaxInput);
    return CalculateMaxSlaUseCase(userInputs);
  } catch (error: any) {
    return error.message;
  }
}

// @ts-ignore
const result = SlaMax();
console.log(result);
