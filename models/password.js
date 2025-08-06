import bcryptjs from 'bcryptjs';

async function hash(password) {
  console.log('Iniciar Hash');
  const rounds = await getNumbersOfRounds();
  console.log('Pegou rounds:', rounds);
  console.log('Tem password:', password);
  return await bcryptjs.hash(password, rounds);
}

async function getNumbersOfRounds() {
  return process.env.NODE_ENV === 'production' ? 14 : 4;
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword, storedPassword);
}

const passwords = {
  hash,
  compare,
};

export default passwords;
