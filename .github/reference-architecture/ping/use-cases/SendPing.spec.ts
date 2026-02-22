import test from 'node:test';
import assert from 'node:assert';
import { SendPing } from './SendPing.js';
import { InMemoryPingRepository } from '../adapters/persistence/InMemoryPingRepository.js';

test('Use Case: SendPing', async (t) => {
  const pingRepository = new InMemoryPingRepository();
  const sendPing = SendPing({ pingRepository });

  await t.test('should successfully create a ping when text is valid', async () => {
    const result = await sendPing({ text: 'Hello' });

    assert.strictEqual(result.success, true);
    if (result.success) {
      assert.strictEqual(result.data.message, 'Hello');
    }
  });

  await t.test('should fail if the text is empty', async () => {
    const result = await sendPing({ text: '' });

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(result.error.code, 'EMPTY_TEXT');
    }
  });
});