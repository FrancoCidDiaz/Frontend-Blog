import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'text-black' : 'text-white' }`} >
    {alerta.msg}</div>
  )
}

export default Alerta