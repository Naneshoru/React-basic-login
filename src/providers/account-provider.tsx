import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AccountContext from "@contexts/account-context";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const AccountProvider: React.FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  
  const refreshTheToken = useCallback(async (refreshToken: string) => {
    setIsLoading(true)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refresh`, {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
    }).finally(() => setIsLoading(false))
    if (response.ok) {
      const { token, refreshToken } = await response.json()
      setIsLoggedIn(true)
      setToken(token)
      localStorage.setItem("refreshToken", refreshToken);
      return { token, refreshToken }
    }
    return { token: '', refreshToken: '' }
  }, [])

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken')
    if (refreshToken) {
      refreshTheToken(refreshToken)
    }
  }, [refreshTheToken])

  const login = async (credentials: { email: string; password: string }): Promise<any> => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
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
    const errorData = await response.json();
    throw Error(errorData?.message || 'Erro ao fazer login');
  };

  const register = async (credentials: { name: string, email: string; password: string }) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
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
    const errorData = await response.json();
    throw Error(errorData?.message || 'Erro no cadastro de usuário');
  }

  const getAccount = async (): Promise<void> => {
    return Promise.resolve();
  };
 
  return (
    <AccountContext.Provider 
      value={{ login, register, getAccount, isLoggedIn, setIsLoggedIn, isLoading, token, setToken, refreshTheToken }}
    >
      {children}
    </AccountContext.Provider>
  )
};

export default AccountProvider;


