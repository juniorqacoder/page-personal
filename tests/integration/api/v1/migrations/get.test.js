import database from 'infra/database';

async function cleanDatabase() {
  await database.query(`
    drop schema public cascade; 
    create schema public;
    `);
}

test('Get to /api/v1/migrations should return 200 and health check', async () => {
  await cleanDatabase();
  const response = await fetch('http://localhost:3000/api/v1/migrations');
  const responseBody = await response.json();
  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
