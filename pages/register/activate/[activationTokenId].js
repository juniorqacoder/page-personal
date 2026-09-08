import DefaultLayout from 'infra/interfaces/DefaultLayout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function RegisterConfirmPage() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState();
  const { activationTokenId } = router.query;

  useEffect(() => {
    if (!activationTokenId) {
      return;
    }
    sendActivationRequest();
    async function sendActivationRequest() {
      try {
        const response = await fetch(
          `/api/v1/activations/${activationTokenId}`,
          {
            method: 'PATCH',
          },
        );
        if (response.status === 200) {
          setConfirmed(true);
          return;
        }
        setConfirmed(false);
      } catch (error) {
        setConfirmed(false);
      }
    }
  }, [activationTokenId]);

  return (
    <DefaultLayout>
      {confirmed ? (
        <h1>Email confirmado com código de ativação</h1>
      ) : (
        <h1>Aguardando</h1>
      )}
    </DefaultLayout>
  );
}
