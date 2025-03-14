import AccountContext from 'contexts/account-context';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import React, { FormEvent, useContext, useState } from 'react';

export default function SignUp() {
  const { register } = useContext(AccountContext)
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  
    register(credentials).catch((err: any) => alert(err))
  }

  return (
    <main>
      <div className="flex justify-center grow p-6 bg-blue-50">
        <div className="w-96 bg-blue-100 p-6 rounded-xl">
          <h1 className="text-3xl font-bold text-blue-800">
            Cadastro de usuário
          </h1>
          <p className="mt-4 text-gray-700">
            Por favor, insira suas informações.
          </p>

          <form action="" className='flex flex-col gap-2 p-2' onSubmit={handleSubmit}>
            <label className='flex flex-col gap-1'>
              Nome: 
              <Input name="name" placeholder="José da Silva" value={credentials.name} onChange={handleChange} className='bg-gray-50' autoComplete="name" />
            </label>

            <label className='flex flex-col gap-1'>
              E-mail: 
              <Input type="email" name="email" placeholder="email@provedor.com.br" value={credentials.email} onChange={handleChange} className='bg-gray-50'autoComplete="email" />
            </label>

            <label className='flex flex-col gap-1'>
              Senha: 
              <Input type="password" name="password" placeholder='******' value={credentials.password} onChange={handleChange} className='bg-gray-50' />
            </label>

            <Button className='mt-4'>Cadastrar</Button>
          </form>
        </div>
      </div>
    </main>
  );
}

