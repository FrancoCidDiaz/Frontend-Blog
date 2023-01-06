import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useForm as hookForm} from 'react-hook-form'
import Alerta from './Alerta'



const Registro = () => {

  const [alerta, setAlerta] = useState({})

const {register,formState:{errors},handleSubmit, reset} = hookForm({mode:"onSubmit", reValidateMode:"onChange"})

const onSubmit = async(data) => {

  const { usuario, email, contraseña} = data

  try {
    const respuesta = await axios.post("http://localhost:4000/api/usuarios",  {usuario, email, contraseña} )
 setAlerta ({msg:respuesta.data.msg, error: false})
reset()
  } catch (error) {
    setAlerta({msg: error.response.data.msg, error: true})
    
  }



}

return (
 
 <form className='flex content-center flex-col items-center h-screen bg-violet-800' onSubmit={handleSubmit(onSubmit)} >
    <div className='flex flex-col content-center items-center mt-44'>
     
    <h1 className="pt-10 pb-10 font-sans text-5xl text-white titulo">Formulario de registro</h1>

    <label className='pb-2 text-white text-1xl' >Usuario</label>
    <input type="text" className='rounded-full w-3/4 text-center h-8' 
  
   
    placeholder="Usuario"
     {
       ...register( "usuario",{
         required: {value: true, message: "El campo Usuario es obligatorio"}, 
    
       })
     }
    />
  { errors?.usuario && <p className='text-white'> {errors.usuario.message}</p>}


    <label className='pb-2 text-white text-1xl' >Email</label>
    <input type="text" className='rounded-full w-3/4 text-center h-8' 
   

     placeholder="Email" 
     {
      ...register( "email",{
        required: {value: true, message: "El campo Email es obligatorio"}, 
      pattern: {
        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        message: "Correo invalido"
       }
      })}
     
     />
      { errors?.email && <p className='text-white'> {errors.email.message}</p>}


    <label className='pb-2 text-white text-1xl' >Constraseña</label>
    <input type="password"  className='rounded-full w-3/4 text-center h-8' 
 
  

    placeholder="Contraseña"
    
    {
      ...register( "contraseña",{
        required: {value: true, message: "El campo Contraseña es obligatorio"}, 
   
      })
    }
    />

{ errors?.contraseña && <p className='text-white'> {errors.contraseña.message}</p>}


   <div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
      <button className='m-2 w-full text-center' type='submit' 
      
     
      >Registrar</button></div>



<div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
    <button className='m-2 w-full text-center'>
    <Link to="../Login">  ¿Ya tienes cuenta?</Link>
    
    </button>
          </div>
      
    </div>

 
      
   

 

      {alerta && <Alerta   alerta={alerta}  /> } 

</form>



 

  
  )
}

export default Registro