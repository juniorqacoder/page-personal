import database from "infra/database";

async function cleanDatabase() {
  await database.query(`
    drop schema public cascade; 
    create schema public;
    `);
}

test('Post to /api/v1/migrations should return 200 and health check', async () => {
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
