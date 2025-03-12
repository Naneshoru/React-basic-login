import React, { useEffect, useState } from 'react'

export default function Dashboard() {
  const [users, setUsers] = useState<{ name: string, email: string }[]>([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {    
        const token = localStorage.getItem('token')
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
  }, [])

  return (
    <main className='text-center'>{users.flatMap(u => 
      u.name != null ? <p>{u.name}</p> : <></>)}
    </main>
  )
}
