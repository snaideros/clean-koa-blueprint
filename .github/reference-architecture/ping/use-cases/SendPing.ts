import { Ping } from '../entities/Ping.js';
import { IPingRepository } from '../entities/interfaces/IPingRepository.js';
import { Result, Success, Failure } from '@shared/Result.js';

export type SendPingDeps = {
  pingRepository: IPingRepository;
};

export type SendPingInput = {
  text: string;
};

export const SendPing = ({ pingRepository }: SendPingDeps) => {
  return async ({ text }: SendPingInput): Promise<Result<Ping>> => {
    if (!text || text.length === 0) {
      return Failure({ code: 'EMPTY_TEXT', message: 'Le texte ne peut pas être vide' });
    }

    const ping = new Ping({ message: text });
    await pingRepository.save({ ping });

    return Success(ping);
  };
};