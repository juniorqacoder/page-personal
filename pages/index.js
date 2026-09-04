import DefaultLayout from 'infra/interfaces/DefaultLayout';

export default function Home() {
  return (
    <DefaultLayout>
      <div>
        {' '}
        <h1>JUNIOR DEV QA (RESTORE)</h1>
        <span>Tech Lead QA - Desenvolvedor Sênior</span>
        <span>
          <br />
          Curso do Deschamps de desenvovlimento simnulando a criação do TabNews
        </span>
        <div>
          <span>
            <a href="/register">Cadastrar usuário</a>
          </span>
        </div>
        <br />
      </div>
    </DefaultLayout>
  );
}
