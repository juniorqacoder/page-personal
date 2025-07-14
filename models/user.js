import database from 'infra/database';
import { NotFoundError, ValidationError } from 'infra/errors';
import password from './password';
('models/password');

async function create(userValues) {
  await validateEmail(userValues.email);
  await validateUsername(userValues.username);
  await hashPasswordObject(userValues);

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

  async function hashPasswordObject(inputValues) {
    const hashPassword = await password.hash(inputValues.password);
    userValues.password = hashPassword;
  }

  async function runInsertQuery(user) {
    const result = await database.query({
      text: `insert into 
        users (username, email, password) 
            values ($1, $2, $3)
            RETURNING * ; `,
      values: [user.username, user.email, user.password],
    });

    return result.rows[0];
  }
}

async function findOneByUsername(username) {
  const userFound = runSelectQuery(username);
  return userFound;
  async function runSelectQuery(username) {
    const result = await database.query({
      text: 'select * from users where lower(username) = lower($1) limit 1',
      values: [username],
    });
    if (result.rowCount === 0) {
      throw new NotFoundError({
        message: 'Não encontraro nenhum username',
        action: 'Verificar se o username está correto',
      });
    }
    return result.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
};
export default user;
