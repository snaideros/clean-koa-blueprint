import { IPingRepository } from '../../entities/interfaces/IPingRepository.js';
import { Ping } from '../../entities/Ping.js';

/**
 * Infrastructure Adapter: InMemoryPingRepository
 * Concrete implementation of IPingRepository using an in-memory array.
 * Useful for development and unit testing (TDD).
 */
export class InMemoryPingRepository implements IPingRepository {
  private pings: Ping[] = [];

  /**
   * Saves a ping entity to the internal array
   */
  async save({ ping }: { ping: Ping }): Promise<void> {
    this.pings.push(ping);
  }
}