import { Result } from '@shared/Result.js';
import { HttpRequest } from '@shared/io/createHttpHandler.js';
import { sendPing } from '../../use-cases/index.js';

/**
 * Interface Adapter: PingController
 * Pure controller: Receives a normalized HttpRequest, delegates to the Use Case, 
 * and returns a Result object.
 */
export const PingController = async ({ body }: HttpRequest): Promise<Result<any>> => {
  const { text } = body;
  
  // Delegate business logic to the Use Case instance (injected in use-cases/index.ts)
  return await sendPing({ text });
};