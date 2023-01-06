import React from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { useForm as hookForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import Alerta from './Alerta'


const NuevoPassword = () => {

const [tokenValido, setTokenValido] = useState(false)
const [passwordModificado, setPasswordModificado] = useState(false)

const params = useParams()

const { token } = params

  useEffect(() => {
    
    const comprobarToken = async() => {

try {
 await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
 setTokenValido(true)
  



} catch (error) {
  console.log(error.response)
}


    }
  
    comprobarToken()
  }, [])
  

  const [alerta, setAlerta] = useState({})
    
  const {register,formState:{errors},handleSubmit} = hookForm({mode:"onSubmit", reValidateMode:"onChange"})



    const onSubmit = async(data) => {

        const { contraseña } = data
      
        try {
          const respuesta = await axios.post(`http://localhost:4000/api/usuarios/olvide-password/${token}`,  { contraseña} )
          setAlerta ({msg:respuesta.data.msg, error: false})
          setPasswordModificado(true)
        } catch (error) {
          setAlerta({msg: error.response.data.msg, error: true})
        }
      
      
      
      }



    return (
<>

      

      {tokenValido && (<div className='mt-40'>
      <form className='flex content-center flex-col items-center h-screen bg-violet-800' onSubmit={handleSubmit(onSubmit)} >
      <div className='contenedor flex flex-col content-center items-center h-screen mt-44'>
       
      <h1 className="pt-10 pb-10 text-5xl text-white titulo">Cambia tu contraseña</h1>
   

      
  
      <label className='pb-2 text-white text-1xl' >Nueva contraseña</label>
      <input type="password" className='rounded-full w-3/4 text-center h-8' 
     
  
   
       placeholder="Nueva contraseña" 
       {
        ...register( "contraseña",{
          required: {value: true, message: "El campo es obligatorio"}, 
      
        })}
       
       />
        { errors?.contraseña && <p> {errors.email.contraseña}</p>}
  
  
  
  
      
  
  
     <div className='w-3/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
        <button type='submit' 
        className='m-2 w-full text-center'
       
        >Enviar</button></div>
        
      </div>

      {alerta && <Alerta  alerta={alerta}  /> } 

      {passwordModificado && (<Link to="../login">Inicia sesion </Link>)}

      </form>
      </div>) 
       }





      </>
        )
      }

export default NuevoPassword