import DefaultLayout from 'infra/interfaces/DefaultLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RegisterConfirmPage() {
  const router = useRouter();
  const { activationTokenId } = router.query;

  console.log(activationTokenId);

  return (
    <DefaultLayout>
      <h1>Email confirmado com código de ativação</h1>
    </DefaultLayout>
  );
}
