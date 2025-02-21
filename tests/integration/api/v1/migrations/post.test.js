import orchestrator from 'tests/orchestrator.js';

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe('POST to /api/v1/migrations', () => {
  test('should run pending migrations with sucess', async () => {
    const response = await fetch('http://localhost:3000/api/v1/migrations', {
      method: 'POST',
    });
    const responseBody = await response.json();
    expect(response.status).toBe(201);
    expect(Array.isArray(responseBody)).toBe(true);
    const resultGet = await fetch('http://localhost:3000/api/v1/migrations');
    const bodygGet = await resultGet.json();
    expect(bodygGet.length).toBe(0);
  });
});
