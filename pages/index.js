import DefaultLayout from 'infra/interfaces/DefaultLayout';
import Link from 'next/link';

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
            <Link href="/register">Cadastrar usuário</Link>
          </span>
        </div>
        <br />
      </div>
    </DefaultLayout>
  );
}
