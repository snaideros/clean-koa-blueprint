import { Result, Success } from '@shared/Result.js';

/**
 * Domain Entity: Ping
 * Represents a basic message with a creation timestamp
 */
export class Ping {
  readonly message: string;
  readonly timestamp: Date;

  constructor({ message }: { message: string }) {
    this.message = message;
    this.timestamp = new Date();
  }
}