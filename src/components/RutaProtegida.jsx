import React from 'react'
import { Outlet, Navigate} from 'react-router-dom'
import { useState } from 'react'
import useAuth from '../hooks/useAuth.jsx'
import Header from './Header.jsx'
import SideBar from './SideBar.jsx'

const RutaProtegida = () => {





   const {auth, cargando} = useAuth()

  return (
    <>
    {auth?._id ? 
    (
<div className='text-white'>

<div>
  <Header></Header>
</div>  


<div>
  <SideBar>
    
   
    
     </SideBar>


     <main>
      <Outlet/>
    </main>
</div>

</div>
    ) : <Navigate to='/login'/>}

    
    </>
  )
}

export default RutaProtegida