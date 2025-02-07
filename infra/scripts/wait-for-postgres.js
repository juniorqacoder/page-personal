const { exec } = require('node:child_process');

function checkDatabase() {
  exec(`docker exec postgres_dev pg_isready --host localhost`, handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search('accepting connections') === -1) {
      process.stdout.write('.');
      checkDatabase();
      return;
    } else {
      console.log('\n🟢 Banco ativo');
    }
  }
}

console.log('🔵 Aguardando banco aceitar conexões');
checkDatabase();
