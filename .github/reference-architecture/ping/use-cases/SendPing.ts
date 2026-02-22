import { Ping } from '../entities/Ping.js';
import { IPingRepository } from '../entities/interfaces/IPingRepository.js';
import { Result, Success, Failure } from '@shared/Result.js';

export type SendPingDeps = {
  pingRepository: IPingRepository;
};

export type SendPingInput = {
  text: string;
};

/**
 * Use Case: SendPing
 * Validates the message and persists it through the repository
 */
export const SendPing = ({ pingRepository }: SendPingDeps) => {
  return async ({ text }: SendPingInput): Promise<Result<Ping>> => {
    // 1. Business Validation
    if (!text || text.length === 0) {
      return Failure({
        code: 'EMPTY_TEXT', 
        message: 'The text message cannot be empty.' 
      });
    }

    // 2. Domain Logic
    const ping = new Ping({ message: text });
    
    // 3. Persistence
    await pingRepository.save({ ping });

    return Success(ping);
  };
};