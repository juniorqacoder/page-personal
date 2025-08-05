import bcryptjs from 'bcryptjs';

async function hash(password) {
  const rounds = await getNumbersOfRounds();
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
