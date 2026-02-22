import { Ping } from '../Ping.js';

/**
 * Repository Interface: IPingRepository
 * Defines the contract for persisting Ping domain entities
 */
export interface IPingRepository {
  /**
   * Saves a ping log to the persistent storage
   */
  save(params: { ping: Ping }): Promise<void>;
}