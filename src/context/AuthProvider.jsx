import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext()

const AuthProvider = ({children})  =>  {


const [auth, setAuth] = useState({})
const [cargando, setCargando] = useState(true)

const navigate = useNavigate()


useEffect(() => {
  const autenticarUsuario = async() => {
    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return
    }

const config = {
    headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token}`
    }
}

try {
    const { data } = await axios('http://localhost:4000/api/usuarios/perfil', config)
   setAuth(data)
   navigate(`/blog`)

} catch (error) {
    setAuth({})
    console.log(error)
}
setCargando(false)
  }

 autenticarUsuario()
}, [])


return (
<AuthContext.Provider
value={{auth,
  setAuth,
  cargando

}}

>

    {children}


</AuthContext.Provider>


)


}



export {

AuthProvider    

}


export default AuthContext