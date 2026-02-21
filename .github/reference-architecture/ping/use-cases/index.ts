import { SendPing } from './SendPing.js';
import { InMemoryPingRepository } from '../adapters/persistence/InMemoryPingRepository.js';

/**
 * Initialisation des dépendances (Infrastructure)
 * Dans un vrai projet, on injecterait ici le repository PostgreSQL ou MongoDB.
 */
const pingRepository = new InMemoryPingRepository();

/**
 * Export des instances de Use Cases (Injectées)
 */
export const sendPing = SendPing({ 
  pingRepository 
});