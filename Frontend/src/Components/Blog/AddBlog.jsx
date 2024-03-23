import React, {useState, useEffect} from 'react'
import '../Components.css'
import axios from 'axios'

const AddBlog = () => {

    const [blogDetails, setBlogDetails] = useState({})
    const id = localStorage.getItem("doctorId")
    const addingBlog = async () => {
        let addedBlog

        try{
            addedBlog = await axios.post("https://docker-mentic-59it.vercel.app/blogs/add", blogDetails)
        }
        catch(err){
            console.log(err)
        }
        console.log(addedBlog)
    }

    const handleChange = (e) => {
        setBlogDetails({
            ...blogDetails,
            [e.target.name]: e.target.value
        })
    }

    const submission = (e) => {
        e.preventDefault()
        setBlogDetails({
            ...blogDetails,
            docId: id
        })
        console.log(blogDetails)
        addingBlog()
       
    }

  return (
    <div className='container-fluid addBlog-container'>


        <div className='row justify-content-center addBlog-row'>
            <div className='col-md-8 addBlog-content'>
            <h1 className='addBlog-header mb-5'>Add Blog</h1>
            <form onSubmit={submission}>
     <div className="mb-3">
   <label  className="form-label">Title</label>
   <input type="text" className="form-control"  name="title" onChange={handleChange} required/>
  </div>
  <div className="mb-3">
   <label  className="form-label">Image Url</label>
   <input type="text" className="form-control" name="img" onChange={handleChange} required/>
  </div>
  <div className="mb-3">
  <label for="exampleFormControlTextarea1" className="form-label">Content</label>
  <textarea className="form-control" rows="3" name="content" onChange={handleChange} required></textarea>
   </div>
   <button type="submit" className="btn btn-primary">Submit</button>
   </form>
    </div>
    </div>
    </div>
  )
}

export default AddBlog
