import { customFetch } from 'utils'
import AccountContext from 'contexts/account-context'
import React, { useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const { token, refreshTheToken, isLoading
   } = useContext(AccountContext)
  const [users, setUsers] = useState<{ name: string, email: string }[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token && !isLoading) {
          const response = await customFetch('http://localhost:3030/api/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }, refreshTheToken)
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
  }, [token, refreshTheToken, isLoading])

  return (
    <main className='text-center'>{users.flatMap(u => 
      u.name != null ? <p>{u.name}</p> : <></>)}
    </main>
  )
}
