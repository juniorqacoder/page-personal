const login = require('../../models/login')

test("Login com sucesso", () => {
  const teste = login.logar('gilmario', 123)
  expect(teste).toBe('Logado com sucesso!')
});

test("Login invalido", () => {
  const teste = login.logar('gilmario', 1)
  expect(teste).toBe('Usuário ou paciente incorreto')
});