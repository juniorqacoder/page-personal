import { useState } from 'react';
import { Button } from '@primer/react';
export default function TestsPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    const bodyData = { username, email, password };

    const response = await fetch('/api/v1/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    });

    if (response.status === 201) {
      location.href = '/register/confirm';
    }
    console.log(await response.json());
  }
  return (
    <>
      <div>
        <h1>Cadastro</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <span>Nome de usuário: </span>
          <input
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
            type="text"
          ></input>
        </div>
        <div>
          <span>Password: </span>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
          ></input>
        </div>
        <div>
          <span>Email: </span>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="text"
          ></input>
        </div>
        <Button variant="primary" type="submit">
          Criar Cadastro
        </Button>
      </form>
    </>
  );
}
