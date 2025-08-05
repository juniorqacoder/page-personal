import bcryptjs from 'bcryptjs';

async function hash(password) {
  const rounds = await getNumbersOfRounds();
  console.log('Rounds', password, rounds);
  const hash = await bcryptjs.hash(password, rounds);
  console.log('HashChangeEvent', hash);
  return hash;
}

async function getNumbersOfRounds() {
  return process.env.NODE_ENV === 'production' ? 14 : 4;
}

async function compare(providedPassword, storedPassword) {
  return bcryptjs.compare(providedPassword, storedPassword);
}

const passwords = {
  hash,
  compare,
};

export default passwords;
