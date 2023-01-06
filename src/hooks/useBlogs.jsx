import { useContext } from "react";
import BlogsContext from "../context/BlogsProvider";


const useBlogs = () => {

    return useContext(BlogsContext)

}

export default useBlogs