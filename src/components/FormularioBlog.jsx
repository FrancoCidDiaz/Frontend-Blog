import React from 'react'
import { useState, useEffect } from 'react'
import useBlogs from '../hooks/useBlogs'
import Alerta from './Alerta'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'


const FormularioBlog = () => {


  const [titulo, setTitulo] = useState("")

  const [contenido, setContenido] = useState("")

  const [id, setId] = useState(null)

  const  params = useParams()


  const navigate = useNavigate()

const {mostrarAlerta, alerta, blogs, setBlogs, blog} = useBlogs()

 useEffect(() => {
   if( params.id ) {
   setId(blog._id)
   setTitulo(blog.titulo)
   setContenido(blog.contenido)
   } 

  
 }, [params])




 const crearBlog = async() =>{

  try {

    const token = localStorage.getItem('token') 
    if(!token) return
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "titulo": titulo,
      "contenido": contenido
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://localhost:4000/api/blog", requestOptions)
      .then(response => response.text())
      .then(result => console.log(`AQUI ESTA ${result}`))
      .catch(error => console.log('error', error));
  
  
    
      mostrarAlerta({
        msg: 'Blog creado correctamente',
        error: false
    })
  
    setTitulo("")
    setContenido("")
  
  
    setTimeout(() => {
      navigate("/blog")
    }, 5000);
  
  } catch (error) {
    console.log(error)
  }  
} 


const actualizarBlog = async(blog) =>{

  try {
   const token = localStorage.getItem('token') 
   if(!token) return  
   


  const config = {
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      }
  }
  

  const { data } = await clienteAxios.put(`/blog/${blog._id}`, blog, config)


  console.log(data)



    
     mostrarAlerta({
       msg: 'Blog actualizado correctamente',
       error: false
   })
 
    
 
   setTimeout(() => {
     navigate("/blog")
   }, 5000);


  } catch (error) {
   console.log(error)
  }

} 



const handleSubmit= async(e) => {
  e.preventDefault()
  
  if([titulo, contenido].includes('')){
  mostrarAlerta({
      msg: 'Todos los campos son obligatorios',
      error: true
  })
  return
  }
  
  console.log(titulo, contenido)
  console.log(blog)
  

  //await submitBlog({titulo, contenido})
 if(titulo.length){
  await actualizarBlog(blog)
   setTitulo("")
   setContenido("")
 }
 else{
  await crearBlog(blog)
 }
  
  
  }


const {msg} = alerta

  return (


<form className='flex flex-col justify-center items-center mt-12' onSubmit={handleSubmit}>

{msg && <Alerta alerta={alerta}/>}
<div>
  <label htmlFor="titulo"></label>
  <input className='text-black' id="titulo"
    type="text" 
    placeholder='Titulo del blog' 
    value={titulo}
    onChange={ e => setTitulo(e.target.value) } 
 />
</div>


<div>
  <label htmlFor="contenido"></label>
  <textarea className='text-black' id="contenido"

  placeholder='Contenido del blog' 
  value={contenido}
  onChange={ e => setContenido(e.target.value) }
 
 
 />
</div>
  <input 
  type="submit" 
  value={id ? "Actualizar Blog" : "Crear Blog"}
/>

</form>
  )
}

export default FormularioBlog