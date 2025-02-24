import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="ui-clickable flex-row justify-center items-center group transition-colors duration-150 ease-in-out gap-2 text-body-md text-color-strong-text group hover:after:bg-off-black relative inline-flex items-center rounded-sm p-3 font-medium after:absolute after:right-0 after:-bottom-[19px] after:left-0 after:z-50 after:h-1 after:w-full after:transition-all after:duration-75 after:ease-in-out after:content-[''] focus:outline-none">
      <nav>
        <Link to={'/'}>
            Início |
        </Link>
        <Link to={'/login'}>Log-in |</Link>
        <Link to={'/dashboard'}>Dashboard</Link>
      </nav>
    </header>
    
  )
}
