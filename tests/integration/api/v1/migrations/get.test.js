test.only('Get to /api/v1/migrations should return 200 and health check', async () => {
  const response = await fetch('http://localhost:3000/api/v1/migrations');
  const responseBody = await response.json();
  console.log(responseBody);
  expect(response.status).toBe(200);
  expect(Array.isArray(responseBody)).toBe(true);
});
