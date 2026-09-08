import { Button } from '@primer/react';
import DefaultLayout from 'infra/interfaces/DefaultLayout';

export default function LoginPage() {
  function handleSubmit() {}
  return (
    <DefaultLayout metadata={{ title: 'login', description: 'faca seu login' }}>
      <form onSubmit={handleSubmit}>
        Usuário : <input type="text"></input>
        <br />
        Senha :<input type="password"></input>
        <Button variant="primary" rafa>
          {' '}
          Entrar{' '}
        </Button>
        <Button variant="danger"> Limpar </Button>
      </form>
    </DefaultLayout>
  );
}
