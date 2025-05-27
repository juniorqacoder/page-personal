import database from 'infra/database';
import { ValidationError } from 'infra/errors';

async function create(userValues) {
  await validateEmail(userValues.email);
  await validateUsername(userValues.username);
  const newUser = await runInsertQuery(userValues);
  return newUser;

  async function validateEmail(email) {
    const result = await database.query({
      text: 'select * from users where lower(email) = lower($1)',
      values: [email],
    });
    if (result.rowCount > 0) {
      throw new ValidationError({
        message: 'O email informado já está sendo utilizado',
        action: 'Realizar cadastro com email difente',
      });
    }
  }

  async function validateUsername(username) {
    const result = await database.query({
      text: 'select * from users where lower(username) = lower($1)',
      values: [username],
    });
    if (result.rowCount > 0) {
      throw new ValidationError({
        message: 'O username informado já está sendo utilizado',
        action: 'Realizar cadastro com username diferente',
      });
    }
  }

  async function runInsertQuery(user) {
    const result = await database.query({
      text: `insert into 
        users (username, email, password) 
            values ($1, $2, $3)
            RETURNING * ; `,
      values: [userValues.username, userValues.email, userValues.password],
    });

    return result.rows[0];
  }
}

const user = {
  create,
};
export default user;
