import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const SideBar = () => {

 const {auth} = useAuth()   

  return (
    <>

<aside className='mt-12 ml-12'>
    
    <p>Hola: {auth.usuario} </p>
     <Link
     to="nuevo-blog"
     >
     Nuevo Blog
     </Link>

</aside>

    </>
  )
}

export default SideBar