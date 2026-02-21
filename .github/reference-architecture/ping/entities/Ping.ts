import { Result, Success } from '@shared/Result.js';

export class Ping {
  readonly message: string;
  readonly timestamp: Date;

  constructor({ message }: { message: string }) {
    this.message = message;
    this.timestamp = new Date();
  }
}