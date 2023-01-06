import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import useBlogs from '../hooks/useBlogs'

const Blog = () => {
 
  

  const params = useParams()

  const { obtenerBlog, blog, cargando} = useBlogs()

  const {titulo, contenido, creador, _id} = blog

  useEffect(() => {
    obtenerBlog(params.id)
   
  }, [])
  


  return (
  cargando ? 
<div className="flex justify-center items-center h-screen">
  <div className="spinner-border animate-spin inline-block w-24 h-24 border-4 rounded-full text-center" role="status">
    <span className="visually-hidden- text-1xl">...</span>
  </div>
</div> 
  
  
  : (
    <div className='h-screen'>
      <div className='flex justify-center gap-4'>
   

       <h1 className='text-4xl mb-12'>{titulo}</h1>
       <div className=''>
        
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
        <Link to={`blog/editar/${params.id}`}> Editar</Link>
      
      </div>
      </div>
    <div className='mb-4 text-center mx-48'>{contenido}</div>
    
   </div>
  )
     
  )
}

export default Blog