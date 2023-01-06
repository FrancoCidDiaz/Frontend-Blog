import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {


  return (

<div className='flex justify-between mx-24'>
  
    <input type="search" 
    className='border-2 border-white rounded-full text-center'
    placeholder='Buscar blog'/>
     

    <Link
    to="/blog"
    className='text-6xl'>
    Blogs
    </Link>

  <button 
   type='button'
   className='border-2 border-white rounded-full p-4'>Cerrar sesion
   </button>



</div>
  )
}

export default Header