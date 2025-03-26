import { customFetch } from 'utils'
import AccountContext from 'contexts/account-context'
import React, { useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const { token, setToken, refreshTheToken } = useContext(AccountContext)
  const [users, setUsers] = useState<{ name: string, email: string }[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token) {
          const response = await customFetch('http://localhost:3030/api/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }, refreshTheToken, setToken)
          if (response.ok) {
            const data = await response.json()
            return data
          }
          return []
        }
        return []
      } catch (error) {
        alert(error)
      }
    }
    fetchUsers().then(data => setUsers(data))
  }, [token, refreshTheToken, setToken])

  return (
    <main className='text-center flex-col'>{users.flatMap((u, key) => 
      u.name != null ? <p key={key}>{`${u.name} - ${u.email}`}</p> : <></>)}
    </main>
  )
}
