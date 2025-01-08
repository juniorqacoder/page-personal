import database from "infra/database.js";

async function status(request, response) {
  const updateAt = new Date().toISOString();
  const maxConnections = await database.query("show max_connections");
  const version = await database.query("show server_version");
  const activeUsers = await database.query(
    "select * from pg_stat_activity where datname = 'local_db'",
  );
  return response.status(200).json({
    update_at: updateAt,
    database: {
      version: version.rows[0].server_version,
      max_connections: parseInt(maxConnections.rows[0].max_connections),
      active_users: activeUsers.rows.length,
    },
  });
}

export default status;
