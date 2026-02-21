import test from 'node:test';
import assert from 'node:assert';
import { SendPing } from './SendPing.js';
import { InMemoryPingRepository } from '../adapters/persistence/InMemoryPingRepository.js';

test('SendPing Use Case', async (t) => {
  const pingRepository = new InMemoryPingRepository();
  const sendPing = SendPing({ pingRepository });

  await t.test('doit créer un ping avec succès quand le texte est valide', async () => {
    const result = await sendPing({ text: 'Hello' });

    assert.strictEqual(result.success, true);
    if (result.success) {
      assert.strictEqual(result.data.message, 'Hello');
    }
  });

  await t.test('doit échouer si le texte est vide', async () => {
    const result = await sendPing({ text: '' });

    assert.strictEqual(result.success, false);
    if (!result.success) {
      assert.strictEqual(result.error.code, 'EMPTY_TEXT');
    }
  });
});