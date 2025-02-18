import orchestrator from 'tests/orchestrator.js'

beforeAll(async ()=>{
  await orchestrator.waitForAllServices()
})
test('Get to /api/v1/status should return 200 and health check', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status');
  const responseBody = await response.json();

  expect(response.status).toBe(200);
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

  expect(responseBody.update_at).toBe(parsedUpdateAt);
  expect(responseBody.database.version).toBe('20');
  expect(responseBody.database.max_connections).toBe(100);
  expect(responseBody.database.active_users).toBeGreaterThan(0);
});
