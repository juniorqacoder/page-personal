import database from 'infra/database';
import migrationRunner from 'node-pg-migrate';
import { join } from 'node:path';

export default async function migrations(request, response) {
  const allowMethods = ['POST', 'GET'];
  if (!allowMethods.includes(request.method)) {
    response.status(405).json({
      error: `Method "${request.method}" not allowed`,
    });
  }

  let dbClient;

  try {
    dbClient = await database.getNewClient();
    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    };

    if (request.method === 'GET') {
      const migrations = await migrationRunner(defaultMigrationOptions);
      response.status(200).json(migrations);
    }

    if (request.method === 'POST') {
      const migrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      response.status(201).json(migrations);
    }
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    dbClient.end();
  }
}
