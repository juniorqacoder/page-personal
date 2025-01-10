import database from "infra/database.js";

async function status(request, response) {
  const dataName = process.env.POSTGRES_DB;
  const updateAt = new Date().toISOString();
  const maxConnections = await database.query("show max_connections");
  const version = await database.query("show server_version");
  const activeUsers = await database.query({
    text: `select count(*)::int as total from pg_stat_activity where datname = $1;`,
    values: [dataName],
  });
  return response.status(200).json({
    update_at: updateAt,
    database: {
      version: version.rows[0].server_version,
      max_connections: parseInt(maxConnections.rows[0].max_connections),
      active_users: activeUsers.rows[0].total,
    },
  });
}

export default status;
