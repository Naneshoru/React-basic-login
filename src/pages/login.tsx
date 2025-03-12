import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const login = async () => {
        const response = await fetch('http://localhost:3030/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json"
          }
        })

        if (response.ok) {
          const { token } = await response.json()
          localStorage.setItem('token', token)
        }
      }
      login().then(() => navigate('/'))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <main>
      <div className="flex justify-center grow p-6 bg-blue-50">
        <div className="w-96 bg-blue-100 p-6">
          <h1 className="text-3xl font-bold text-blue-800">
            Faça o login
          </h1>
          <p className="mt-4 text-gray-700">
            Por favor, insira suas informações.
          </p>

          <form action="" className='flex flex-col gap-2 p-2' onSubmit={handleSubmit}>
            <label className='flex flex-col gap-1'>
              E-mail: 
              <Input type="email" name="email" placeholder="email@provedor.com.br" value={credentials.email} onChange={handleChange} className='bg-gray-50' />
            </label>

            <label className='flex flex-col gap-1'>
              Senha: 
              <Input type="password" name="password" placeholder='******' value={credentials.password} onChange={handleChange} className='bg-gray-50' />
            </label>

            <Button className='mt-4'>Entrar</Button>
          </form>
        </div>
      </div>
    </main>
  );
}
