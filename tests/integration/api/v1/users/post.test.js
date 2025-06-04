import orchestrator from 'tests/orchestrator.js';
import { version as uuidVersion } from 'uuid';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe('POST to /api/v1/users', () => {
  describe('Anonymous user', () => {
    test('With unique and valid data', async () => {
      const response = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'gilmario',
          email: 'gilmario@qaxsolutions.com',
          password: 'senha123',
        }),
      });
      const responseBody = await response.json();
      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'gilmario',
        email: 'gilmario@qaxsolutions.com',
        password: 'senha123',
        create_at: responseBody.create_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.create_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
    });
    test('With duplicated requests', async () => {
      const response1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emailduplicado1',
          email: 'duplicado@qaxsolutions.com',
          password: 'senha123',
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'emailduplicado2',
          email: 'Duplicado@qaxsolutions.com',
          password: 'senha123',
        }),
      });
      const responseBody = await response2.json();
      expect(response2.status).toBe(400);
      expect(responseBody.message).toBe(
        'O email informado já está sendo utilizado',
      );
      expect(responseBody.action).toBe('Realizar cadastro com email difente');
    });
    test('With duplicated username', async () => {
      const response1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'usernameduplicado',
          email: 'email1@qaxsolutions.com',
          password: 'senha123',
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'UsernameDuplicado',
          email: 'username2@qaxsolutions.com',
          password: 'senha123',
        }),
      });
      const responseBody = await response2.json();
      expect(response2.status).toBe(400);
      expect(responseBody.message).toBe(
        'O username informado já está sendo utilizado',
      );
      expect(responseBody.action).toBe(
        'Realizar cadastro com username diferente',
      );
    });
  });
});
