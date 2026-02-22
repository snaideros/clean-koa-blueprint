import { SendPing } from './SendPing.js';
import { InMemoryPingRepository } from '../adapters/persistence/InMemoryPingRepository.js';

/**
 * Infrastructure Initialization
 * In production, replace InMemory with PostgreSQL, MongoDB, etc.
 */
const pingRepository = new InMemoryPingRepository();

/**
 * Use Case Instances Export (Injected)
 * Ensures loose coupling between layers
 */
export const sendPing = SendPing({ 
  pingRepository 
});