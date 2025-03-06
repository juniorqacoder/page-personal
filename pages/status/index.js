import useSWR from 'swr';

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}
export default function StatusPage() {
  return (
    <div align="center">
      <h1>Health Check</h1>
      <h3>Status</h3>
      <UpdateAt />
      <h3> Dados do Banco</h3>
      <BaseData />
    </div>
  );
}

function UpdateAt() {
  const { data, isLoading } = useSWR('/api/v1/status', fetchAPI);
  let updateAtText = 'Carregando ...';
  if (!isLoading) {
    updateAtText = new Date(data.update_at).toLocaleString('pt-BR');
  }
  return <div>Última atualização: {updateAtText}</div>;
}

function BaseData() {
  const { data, isLoading } = useSWR('/api/v1/status', fetchAPI);
  let baseVersion = 'Carregando ...';
  let activeUsers = '';
  if (!isLoading) {
    baseVersion = data.database.version;
    activeUsers = `Usuários ativos: ${data.database.active_users}`;
  }
  return (
    <div>
      <p>Versão: {baseVersion}</p>
      <p>{activeUsers}</p>
    </div>
  );
}
