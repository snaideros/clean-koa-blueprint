import { Ping } from '../Ping.js';

export interface IPingRepository {
  /**
   * Sauvegarde un log de ping
   */
  save(params: { ping: Ping }): Promise<void>;
}