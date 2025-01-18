function logar(user, password) {
  if (password == 123) {
    return 'Logado com sucesso!';
  } else {
    return 'Usuário ou paciente incorreto';
  }
}

exports.logar = logar;
