
const Blog = require('../Model/BlogModel')
const Doctor = require('../Model/DoctorModel')

//ADDBLOGS
exports.addBlogs = async(req, res, next) => {
    let addedBlog
    let doctor
    const {docId, img, title, content} = req.body
    try{
        doctor = await Doctor.DoctorModel.findById(docId)

        if(!doctor){
            return res.status(404).json({message: "Doctor not found"})
        }

        try{
            addedBlog = new Blog.BlogModel({
                docId,
                docname: doctor.name,
                img,
                title,
                content
            })
            addedBlog = addedBlog.save()
        }
        catch(err){
           return console.log(err)
        }
        if(!addedBlog){
            return res.status(409).json({message: "Could not add Blog"})
        }
        return res.status(200).json({message: "Blog added", addedBlog})

    }catch(err){
        return console.log(err)
    }
   
   
}

//GETBLOGS
exports.getBlogs = async (req, res, next) => {
    let blogs
    try{
        blogs = await Blog.BlogModel.find()
    }
    catch(err){
        return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message: "No blogs found"})
    }
    return res.status(200).json({blogs})
}


//SearchBlogs
exports.searchBlogs = async(req, res, next) => {
    let blogs
    const {keyword} = req.query
    // console.log(keyword)
    try{
        blogs = await Blog.BlogModel.find({
        
            $or: [
                { title: { $regex: keyword, $options: 'i' } }, 
                { content: { $regex: keyword, $options: 'i' } },
              ],
        })
    }
    catch(err){
        return console.log(err)
    }
    if(!blogs){
       return res.status(404).json({message: "No blogs found"})
    }
    // const serializedPosts = blogs.map((blog) => blog.toObject());
    // return res.json(serializedPosts);
    return res.status(200).json({blogs})
}