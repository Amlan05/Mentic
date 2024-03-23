import React, {useState, useEffect} from 'react'
import "../Components.css"
import axios from 'axios'

const Blog = () => {
  // const arr =[1,2,3,4]
  const [blogs, setBlogs] = useState([])
  const [search, setSearch] = useState()
  const [isSearch, SetIsSearch] = useState(false)

  const getBlogs = async() => {
   const blogData = await axios.get("https://docker-mentic-59it.vercel.app/blogs")
    console.log(blogData.data)
    return (blogData.data)
  }

  const filterBlogs = async() => {
    let filteredBlogs
    try{
      filteredBlogs = await axios.get(`https://docker-mentic-59it.vercel.app/blogs/search?keyword=${encodeURIComponent(search)}`)
    }
    catch(err){
      console.log(err)
    }
    console.log(filteredBlogs.data.blogs)
    const setFilteredBlogs = filteredBlogs.data
    setBlogs(setFilteredBlogs.blogs)
    // console.log(filteredBlogs)

  }

  const changeHandler = (e) => {
    setSearch(e.target.value)
  }

  const submission = (e) => {
    e.preventDefault()
    filterBlogs()
  }

  useEffect( () => {
    getBlogs()
    .then( p => {
      setBlogs(p.blogs)
    })
  },[])

  return (
    <div className='container-fluid blog'>
      <div className='row justify-content-evenly'>
        <div className='col-12 text-center my-5'>
            <h1 className="fw-bold blogheading">Health insights from experts</h1>
        </div>

      <div className='col-8 mb-4'>
    <form class="d-flex" onSubmit={submission}>
      <input class="form-control me-2" type="search" placeholder="Search Blogs" onChange={changeHandler} aria-label="Search"/>
      <button class="btn btn-outline-success" type="submit">Search</button>
    </form>
    </div>

      </div>
      {blogs.map( p => {
        return (
          <div className="container col-xxl-8 px-4 py-5">
    <div className="row  align-items-center g-5 py-5">
    <div className="col-10 col-sm-8 col-lg-6">
        <img src={p.img}className="d-block mx-lg-auto img-fluid" alt="No image" width="700" height="500" loading="lazy" />
      </div>
    <div className="col-lg-6">
        <h1 className="display-5 fw-medium text-body-emphasis lh-1 mb-3">{p.title}</h1>
        <p className="lead">{p.content}</p>
        <h4 className='docBlog'>{p.docname}</h4>
      </div>
      
    </div>
  </div>
        )
      })}
      
  </div>  
  )
}

export default Blog
