import React from 'react'
import { useForm as hookForm} from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import Alerta from './Alerta'


const OlvidePassword = () => {


  const [alerta, setAlerta] = useState({})

 


    const {register,formState:{errors},handleSubmit} = hookForm({mode:"onSubmit", reValidateMode:"onChange"})



    const onSubmit = async(data) => {

        const { email } = data
      
        try {
          const respuesta = await axios.post("http://localhost:4000/api/usuarios/olvide-password",  { email} )
          setAlerta ({msg:respuesta.data.msg, error: false})
       
          
        } catch (error) {
          console.log(error.data.msg)
          setAlerta({msg: error.data.msg, error: true})
        }
      
      
      
      }



    return (
       
          <form  className='flex content-center flex-col items-center h-screen bg-violet-800' onSubmit={handleSubmit(onSubmit)} >
          <div className='contenedor flex flex-col content-center items-center mt-44'>
           
          <h1 className="pt-10 pb-10 text-5xl text-white titulo">Cambia tu contraseña</h1>
       

       <h2 className="pt-10 pb-10 text-1xl text-white">Te enviaremos un enlace a tu correo para que puedas cambiar la contraseña </h2>
          
      
          <label className='pb-2 text-white text-1xl' >Email</label>
          <input type="text" className='rounded-full w-2/4 text-center h-8' 
  
      
       
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
      
      
      
      
          
      
      
         <div className='w-2/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
            <button type='submit' 
            className='m-2 w-full text-center'
           
            >Enviar correo</button></div>
            
          </div>

          {alerta && <Alerta  alerta={alerta}  /> } 

          </form>
         
        )
      }

export default OlvidePassword