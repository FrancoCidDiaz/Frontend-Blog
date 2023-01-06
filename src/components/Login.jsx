import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm as hookForm} from 'react-hook-form'
import axios from 'axios'
import Alerta from './Alerta'
import useAuth from '../hooks/useAuth'


const Login = () => {

  const [alerta, setAlerta] = useState({})

  const {auth, setAuth }  = useAuth()

  const navigate = useNavigate()

 


    const {register,formState:{errors},handleSubmit} = hookForm({mode:"onSubmit", reValidateMode:"onChange"})



    const onSubmit = async(data) => {

        const {  email, contraseña} = data
      
        try {
          const respuesta = await axios.post("http://localhost:4000/api/usuarios/login",  { email, contraseña} )
          console.log(respuesta)
          setAlerta({})
          localStorage.setItem('token', respuesta.data.token)
          setAuth(respuesta.data)
         navigate('/blog')
       
          
        } catch (error) {
          console.log(error)
          setAlerta({msg: error.response.data.msg, error: true})
        }
      
      
      
      }



  return (
     
  <form className='flex content-center flex-col items-center h-screen bg-violet-800' onSubmit={handleSubmit(onSubmit)} >
          <div className='flex flex-col content-center items-center mt-44'>
           
          <h1 className="pt-10 pb-10 text-5xl text-white titulo">Login de Usuarios</h1>
      
          
      
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
            { errors?.email && <p> {errors.email.message}</p>}
      
      
      
      
          <label className='pb-2 text-white text-1xl' >Constraseña</label>
          <input type="password"  className='rounded-full w-3/4 text-center h-8' 
       
        
      
          placeholder="Contraseña"
          
          {
            ...register( "contraseña",{
              required: {value: true, message: "El campo Contraseña es obligatorio"}, 
         
            })
          }
          />
      
      { errors?.contraseña && <p> {errors.contraseña.message}</p>}
      
      
         <div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
            <button type='submit' 
            className='m-2 w-full text-center'
           
            >Inicia Sesion</button></div>
            

            <div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
              <button className='m-2 w-full text-center'>
            <Link to="../Registro">Registrate</Link>
            </button>
            </div>


            <div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
              <button className='m-2 w-full text-center'>
            <Link to="../Olvide-password">Olvide mi contraseña</Link>
            </button>
            </div>


          </div>

          {alerta && <Alerta  alerta={alerta}  /> } 

      </form>
          
        )
      }

export default Login