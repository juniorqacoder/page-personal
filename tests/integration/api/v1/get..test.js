test("Get to /api/status should return 200 and health check", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  console.log(responseBody);

  expect(response.status).toBe(200);
  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();

  expect(responseBody.update_at).toBe(parsedUpdateAt);
  expect(responseBody.database.version).toBe("17.2");
  expect(responseBody.database.max_connections).toBe(100);
  expect(responseBody.database.active_users).toBeGreaterThan(0)
});
