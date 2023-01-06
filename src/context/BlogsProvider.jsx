import { useState, useEffect, createContext} from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";


const BlogsContext = createContext()

const BlogsProvider = ({children}) => {

    const [blogs, setBlogs] = useState([])
    const [alerta, setAlerta] = useState([])
    const [blog, setBlog] = useState({})
    const [cargando, setCargando] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
     const obtenerBlogs = async() =>{

      try {
        const token = localStorage.getItem('token') 
               if(!token) return
        
         const config = {
             headers: {
                 "Content-Type": "aplication/json",
                 Authorization : `Bearer ${token}`
             }
         }
        
         const { data } = await clienteAxios.get("/blog", config)
        setBlogs(...blogs, data)
        
      } catch (error) {
        console.log(error)
      }

     }
    

     obtenerBlogs()
     
    }, [])
    


    

    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 3500);
    }



    // const submitBlog = async blog => {
    //     if(blog.id) {
    //         await actualizarBlog(blog)
    //     } else {
    //         await crearBlog(blog) }



 const obtenerBlog = async(id) => {
  
    try {
        setCargando(true)
        const token = localStorage.getItem('token') 
               if(!token) return
        
         const config = {
             headers: {
                 "Content-Type": "aplication/json",
                 Authorization : `Bearer ${token}`
             }
         }

         const {data} = await clienteAxios.get(`blog/${id}`, config)
        setBlog(data)
       

    } catch (error) {
        console.log(error)
    }
  finally {
setTimeout(() => {
    setCargando(false)  
}, 800);

 
    }
 }










 


const eliminarBlog = async(id)=> {
try {
  
    const token = localStorage.getItem('token') 
    if(!token) return

const config = {
  headers: {
      "Content-Type": "aplication/json",
      Authorization : `Bearer ${token}`
  }
}

const {data} = await clienteAxios.delete(`blog/${id}`, config)   
console.log(data)

const blogsActualizados = () => blogs.filter(blogState => blogState._id !==  id)

  setBlogs(blogsActualizados)

} catch (error) {
  console.log(error)  
}
}
    
  

return (
    <BlogsContext.Provider
    value={{
blogs,
mostrarAlerta,
alerta,
obtenerBlog,
blog,
cargando,
eliminarBlog


    }}>
   {children}     
    </BlogsContext.Provider>
)

}

export {
    BlogsProvider
}

export default BlogsContext