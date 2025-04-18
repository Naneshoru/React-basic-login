import AccountContext from '@contexts/account-context';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import React, { FormEvent, useContext, useState } from 'react';
import { Mail, User } from 'lucide-react';
import PasswordInput from '../components/ui/input-password';

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
            <Input 
              name="name" 
              placeholder="José da Silva" 
              value={credentials.name} 
              onChange={handleChange} 
              className='bg-gray-50' 
              autoComplete="name"
              label="Nome:"
              icon={<User size={20} />}
            />

            <Input
              type="email"
              name="email"
              placeholder="email@provedor.com.br" 
              value={credentials.email} 
              onChange={handleChange} className='bg-gray-50' 
              autoComplete="email"
              label="E-mail:"
              icon={<Mail size={20} />}
            />
            <PasswordInput 
              type="password" 
              name="password" 
              placeholder='******' 
              value={credentials.password} 
              onChange={handleChange} className='bg-gray-50' 
              label="Senha:"
            />

            <Button 
              className='mt-4' 
              disabled={credentials.password.length <= 6}
            >
              Entrar
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}

