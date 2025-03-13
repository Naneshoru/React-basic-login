import AccountContext from 'contexts/account-context'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const { isLoggedIn } = useContext(AccountContext)

  const navigate = useNavigate()
  const onExit = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <header className="ui-clickable flex-row justify-center items-center group transition-colors duration-150 ease-in-out gap-2 text-body-md text-color-strong-text group hover:after:bg-off-black relative inline-flex items-center rounded-sm p-3 font-medium after:absolute after:right-0 after:-bottom-[19px] after:left-0 after:z-50 after:h-1 after:w-full after:transition-all after:duration-75 after:ease-in-out after:content-[''] focus:outline-none">
      <nav>
        <Link to={'/'}>
            Início |
        </Link>
        {!isLoggedIn ? <>
          <Link to={'/signup'}>Crie a sua conta |</Link> 
          <Link to={'/login'}>Entre |</Link>
        </> : <p onClick={onExit} className='cursor-pointer'>Sair |</p>
        }
        <Link to={'/dashboard'}>Dashboard</Link>
      </nav>
    </header>
    
  )
}
