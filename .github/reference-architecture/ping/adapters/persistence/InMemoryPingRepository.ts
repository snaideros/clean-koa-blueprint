import { IPingRepository } from '../../entities/interfaces/IPingRepository.js';
import { Ping } from '../../entities/Ping.js';

export class InMemoryPingRepository implements IPingRepository {
  private pings: Ping[] = [];

  async save({ ping }: { ping: Ping }): Promise<void> {
    this.pings.push(ping);
  }
}