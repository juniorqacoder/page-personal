import database from "infra/database.js";

async function status(request, response) {
  const result = await database.query("select 1 + 1 as SUM;");
  console.log("Result: ", result.rows);
  return response.status(200).json({return: result.rows});
}

export default status;
