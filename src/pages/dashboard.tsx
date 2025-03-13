import AccountContext from 'contexts/account-context'
import React, { useContext, useEffect, useState } from 'react'

export default function Dashboard() {
  const { token } = useContext(AccountContext)
  const [users, setUsers] = useState<{ name: string, email: string }[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (token) {
          console.log(token)
          const response = await fetch('http://localhost:3030/api/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
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
  }, [token])

  return (
    <main className='text-center'>{users.flatMap(u => 
      u.name != null ? <p>{u.name}</p> : <></>)}
    </main>
  )
}
