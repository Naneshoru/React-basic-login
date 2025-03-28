import { createContext } from "react";

type AccountContextProps = {
  login: (credentials: { email: string; password: string }) => Promise<{ token: string; refreshToken: string }>;
  getAccount: () => Promise<void>;
  register: (credentials: { name: string, email: string; password: string }) => Promise<{ message: string }>
  isLoggedIn: boolean
  setIsLoggedIn: (loggedIn: boolean) => void
  token: string
  setToken: (token: string) => void
  refreshTheToken: (refreshToken: string) => Promise<{ token: string, refreshToken: string }>
  isLoading: boolean
}

const defaultValues: AccountContextProps = {
  login: async () => ({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  }),
  getAccount: async () => {},
  register: async () => ({ message: 'Usuário criado com sucesso!' }),
  isLoggedIn: true,
  setIsLoggedIn: () => {},
  token: '',
  setToken: () => {},
  refreshTheToken: async () => ({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  }),
  isLoading: false
};

const AccountContext = createContext<AccountContextProps>(defaultValues);

export default AccountContext;
