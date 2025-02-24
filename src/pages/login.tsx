import { Button } from 'components/ui/button';
import Debug from 'components/debug';
import { Input } from 'components/ui/input';
import React, { useState } from 'react';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <main>
      <Debug value={credentials} />
      <div className="flex justify-center grow p-6 bg-blue-50">
        <div className="w-96 bg-blue-100 p-6">
          <h1 className="text-3xl font-bold text-blue-800">
            Cadastro de usuário
          </h1>
          <p className="mt-4 text-gray-700">
            Por favor, insira suas informações.
          </p>

          <form action="" className='flex flex-col gap-2 p-2'>
            <Input type="email" name="email" placeholder="email@provedor.com.br" value={credentials.email} onChange={handleChange} className='bg-gray-50' />

            <Input type="password" name="password" placeholder='******' value={credentials.password} onChange={handleChange} className='bg-gray-50' />

            <Button>Cadastrar</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
