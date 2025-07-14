import orchestrator from 'tests/orchestrator.js';
import { version as uuidVersion } from 'uuid';
import password from 'models/password';

beforeAll(async () => {
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe('PATCH to /api/v1/users/[username]', () => {
  describe('Anonymous user', () => {
    test('With nonexistent user', async () => {
      const response = await fetch(
        'http://localhost:3000/api/v1/users/nonexistent',
        {
          method: 'PATCH',
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();
      expect(responseBody).toEqual({
        name: 'NotFoundError',
        message: 'Não encontraro nenhum username',
        action: 'Verificar se o username está correto',
        status_code: 404,
      });
    });

    test('With duplicated username', async () => {
      const user1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'user1',
          email: 'user1@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const user2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'user2',
          email: 'user2@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const response = await fetch('http://localhost:3000/api/v1/users/user2', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'user1' }),
      });
      const responseBody = await response.json();
      expect(response.status).toBe(400);
      expect(responseBody.message).toBe(
        'O username informado já está sendo utilizado',
      );
      expect(responseBody.action).toBe(
        'Utilizar um usuário diferente para esta ação',
      );
    });

    test('With duplicated email', async () => {
      const user1 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'duplicado1',
          email: 'duplicado1@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const user2 = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'duplicado2',
          email: 'duplicado2@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const response = await fetch(
        'http://localhost:3000/api/v1/users/duplicado2',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'duplicado1@qaxsolutions.com' }),
        },
      );
      const responseBody = await response.json();
      expect(response.status).toBe(400);
      expect(responseBody.message).toBe(
        'O email informado já está sendo utilizado',
      );
      expect(responseBody.action).toBe(
        'Utilizar um email diferente para esta ação!',
      );
    });

    test('With unique "username"', async () => {
      const user = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'unique1',
          email: 'unique@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const response = await fetch(
        'http://localhost:3000/api/v1/users/unique1',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'unique2' }),
        },
      );
      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'unique2',
        email: 'unique@qaxsolutions.com',
        password: responseBody.password,
        create_at: responseBody.create_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.create_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();

      expect(responseBody.update_at > responseBody.create_at).toBe(true);
    });

    test('With unique "email"', async () => {
      const user = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'uniqueEmail',
          email: 'uniqueEmail@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const response = await fetch(
        'http://localhost:3000/api/v1/users/uniqueEmail',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'uniqueEmail2@qaxsolutions.com' }),
        },
      );
      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'uniqueEmail',
        email: 'uniqueEmail2@qaxsolutions.com',
        password: responseBody.password,
        create_at: responseBody.create_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.create_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();

      expect(responseBody.update_at > responseBody.create_at).toBe(true);
    });

    test('With new "password"', async () => {
      const user = await fetch('http://localhost:3000/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'newPassword',
          email: 'newPassword@qaxsolutions.com',
          password: 'senha123',
        }),
      });

      const response = await fetch(
        'http://localhost:3000/api/v1/users/newPassword',
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password: 'newPass' }),
        },
      );
      const responseBody = await response.json();

      expect(response.status).toBe(201);
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: 'newPassword',
        email: 'newPassword@qaxsolutions.com',
        password: responseBody.password,
        create_at: responseBody.create_at,
        update_at: responseBody.update_at,
      });
      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.create_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();

      expect(responseBody.update_at > responseBody.create_at).toBe(true);

      const correctPasswordMatch = await password.compare(
        'newPass',
        responseBody.password,
      );
      expect(correctPasswordMatch).toBe(true);
    });
  });
});
