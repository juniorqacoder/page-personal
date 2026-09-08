import { useState } from 'react';
import { Button, FormControl, TextInput, Stack, Heading } from '@primer/react';
import DefaultLayout from 'infra/interfaces/DefaultLayout';

export default function RegisterPage() {
  return (
    <DefaultLayout
      metadata={{
        title: 'Cadastro',
        description: 'cadastro de usuário para utilização do sistema.',
      }}
      contentWidth="small"
    >
      <Stack gap="spacious">
        <Heading as="h1">Cadastro</Heading>
        <RegisterForm />
      </Stack>
    </DefaultLayout>
  );
}

function RegisterForm() {
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
  }
  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={'normal'}>
        <FormControl>
          <FormControl.Label>Nome de usuário: </FormControl.Label>
          <TextInput
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
            type="text"
            block
          ></TextInput>
        </FormControl>
        <FormControl>
          <FormControl.Label>Password: </FormControl.Label>
          <TextInput
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
            block
          ></TextInput>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email: </FormControl.Label>
          <TextInput
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="text"
            block
          ></TextInput>
        </FormControl>
        <Stack.Item>
          <Button variant="primary" type="submit">
            Criar Cadastro
          </Button>
        </Stack.Item>
      </Stack>
    </form>
  );
}
