
import './App.css';
import { useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route, redirect, Link, Navigate } from 'react-router-dom';
import Registro from './components/Registro';
import Login from './components/Login';
import OlvidePassword from './components/OlvidePassword';
import NuevoPassword from './components/NuevoPassword';
import ConfirmarCuenta from './components/ConfirmarCuenta';
import NuevoBlog from './components/NuevoBlog';
import { AuthProvider } from './context/AuthProvider';
import RutaProtegida from './components/RutaProtegida';
import Blogs from './components/Blogs';
import { BlogsProvider } from './context/BlogsProvider';
import Blog from './components/Blog';
import EditarBlog from './components/EditarBlog';


function App() {





  return (
      <BrowserRouter>
      <AuthProvider>
        <BlogsProvider>
<Routes>



<Route path='/registro' element={<Registro/>}  

>


</Route>

<Route path='/login' index element={<Login/>}
 
>


</Route>


<Route path='/olvide-password' element={<OlvidePassword/>}>


</Route>

<Route path='/olvide-password/:token' element={<NuevoPassword/>}>


</Route>


<Route path='/confirmar/:id' element={<ConfirmarCuenta/>}>


 </Route>


 <Route path='/blog' element={<RutaProtegida/>}>
<Route index element={<Blogs/>} />
<Route path="nuevo-blog" element={<NuevoBlog/>}/>
<Route path=":id" element={<Blog/>}/>
<Route path=":id/blog/editar/:id" element={<EditarBlog/>}/>
 </Route>





</Routes>


</BlogsProvider> 
</AuthProvider>

      </BrowserRouter>  
  );
}

export default App;
