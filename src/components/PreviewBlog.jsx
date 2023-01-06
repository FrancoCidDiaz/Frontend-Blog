import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {
 
  const {titulo, contenido, creador, _id} = blog


  return (
  <div className='mt-4 flex flex-col justify-center items-center border-b-4 border-gray-300'>
    <div className='text-4xl mb-8'>{titulo}</div>
    <Link className='mb-6' to={`${_id}`}>Ver Blog</Link>
    
  </div>
  )
}

export default Blog