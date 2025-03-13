import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AccountContext from "contexts/account-context";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AccountProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')

  const navigate = useNavigate()
  
  const refreshTheToken = useCallback(async (refreshToken: string) => {
    if (!isLoggedIn) {
      const response = await fetch('http://localhost:3030/api/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (response.ok) {
        const { token, refreshToken } = await response.json()
        setIsLoggedIn(true)
        setToken(token)
        localStorage.setItem("refreshToken", refreshToken);
        return { token, refreshToken }
      }
      return { token: '', refreshToken: '' }
    }
  }, [isLoggedIn])

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      refreshTheToken(refreshToken)
    }
  }, [refreshTheToken])

  const login = async (credentials: { email: string; password: string }): Promise<{ token: string; refreshToken: string }> => {

    const response = await fetch("http://localhost:3030/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const { token, refreshToken } = await response.json();
      
      setIsLoggedIn(true)
      setToken(token)
      localStorage.setItem("refreshToken", refreshToken);

      navigate('/')
      return { token, refreshToken };
    }
    setIsLoggedIn(false)
    throw Error('Erro no login');
  };

  const register = async (credentials: { name: string, email: string; password: string }) => {
    const response = await fetch('http://localhost:3030/api/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (response.ok) {
      navigate('/login')
      const data = await response.json()
      return data
    }
    throw Error('Erro no cadastro de usuário');
  }

  const getAccount = async (): Promise<void> => {
    return Promise.resolve();
  };
 
  return (
    <AccountContext.Provider 
      value={{ login, register, getAccount, isLoggedIn, setIsLoggedIn, token }}
    >
      {children}
    </AccountContext.Provider>
  )
};

export default AccountProvider;
