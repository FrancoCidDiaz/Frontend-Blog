import React from 'react'
import useBlogs from '../hooks/useBlogs'
import Blog from './Blog'
import PreviewBlog from './PreviewBlog'

const Blogs = () => {


  const { blogs } = useBlogs()
 
 
  return (
<>

    <div>
      <h1 className='text-6xl text-center mt-20 mb-20'>Blogs</h1>
    </div>
    <div className='mx-96 '>
    {
      blogs.length ? 
        blogs.map(blog => (
          <PreviewBlog
           key={blog._id}
           blog={blog}
          />
        ) )
        : <p>No hay blogs aun</p>
    }
       </div>

    </>
  )
}

export default Blogs