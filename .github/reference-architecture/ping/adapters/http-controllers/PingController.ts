import { Result } from '@shared/Result.js';
import { HttpRequest } from '@shared/io/createHttpHandler.js';
import { sendPing } from '../../use-cases/index.js';

/**
 * Contrôleur pur : Reçoit une requête normalisée, appelle le Use Case, renvoie un Result.
 */
export const PingController = async ({ body }: HttpRequest): Promise<Result<any>> => {
  const { text } = body;
  
  // On délègue au Use Case (le flux métier)
  return await sendPing({ text });
};