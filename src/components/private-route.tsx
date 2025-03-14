import AccountContext from 'contexts/account-context'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }: any) {
  const { isLoading, isLoggedIn } = useContext(AccountContext)

  if (isLoading) { return <></> }

  return (
    isLoggedIn 
      ? <>{children}</>
      : <Navigate to={'/login'}></Navigate>
  )
}
