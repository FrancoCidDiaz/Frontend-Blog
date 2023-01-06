import React from 'react'
import Alerta from './Alerta'
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'


const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({})
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)

  const params = useParams()
const { id } = params 

useEffect(() => {
const confirmarCuenta = async()=>{

try {
  const { data } = await axios(`http://localhost:4000/api/usuarios/confirmar/${id}`)
  setAlerta({msg: data.msg, error:false})
  setCuentaConfirmada(true)
} catch (error) {
  setAlerta({msg: error.response.data.msg, error:true})
}

 } 



 confirmarCuenta()

  
}, [])


  
//   const envio = async(data) =>{
//     const {  token} = data
//   try {
//     const respuesta = await axios.get("http://localhost:4000/api/usuarios/confirmar/:token",  { token} )
//     console.log(respuesta)
//   } catch (error) {
//     console.log(error)
//     setAlerta({msg: error.response.data.msg})
//   }


// }

const {msg} = alerta 

  return (
    <form  className='flex content-center flex-col items-center h-screen bg-violet-800'>
    <div className='flex flex-col content-center items-center mt-80 w-1/4'>
       {alerta && <Alerta  alerta={alerta}  /> } 

       {cuentaConfirmada && 
       <div className='w-2/4 bg-violet-800 border-2 border-white rounded-full text-white hover:bg-violet-600 m-3 text-center'>
       <button className='m-2 w-full text-center'>
         <Link className='text-white' to="../Login"> Inicia sesion</Link>
         </button> 
         </div> } 

    </div>
    </form>
  )
}

export default ConfirmarCuenta