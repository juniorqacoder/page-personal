import retry from 'async-retry';
import { faker } from '@faker-js/faker';
import database from 'infra/database';
import migrator from 'models/migrator';
import user from 'models/user';

async function waitForAllServices() {
  await waitForWebServer();
  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
    async function fetchStatusPage() {
      const response = await fetch('http://localhost:3000/api/v1/status');
      if (response.status !== 200) {
        throw Error;
      }
    }
  }
}
async function clearDatabase() {
  await database.query(`
    drop schema public cascade; 
    create schema public;
    `);
}
async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}
async function createUser(userValues) {
  return await user.create({
    username:
      userValues?.username || faker.internet.username().replace(/[_.-]/g, ''),
    email: userValues?.email || faker.internet.email(),
    password: userValues?.password || 'passwordForTest2025',
  });
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  runPendingMigrations,
  createUser,
};

export default orchestrator;
