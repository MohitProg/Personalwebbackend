import BlogModel from "../Modals/BlogModel.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";


const Getblogdata = async (req, res) => {
  try {
    const getBlogs = await BlogModel.find().populate("Author", [
      "name",
      "email",
      "avatar"
    ]);
    console.log(getBlogs);
    return res.send({ success: true, getBlogs });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};

const PostBlogdata = async (req, res) => {
  const id = req.newuser;



  try {
    const { category, title, summary, content } = req.body;

    if (req.file !== undefined && req?.file?.originalname.length > 0) {

      const filepath=await UploadOnCloudinary(req?.file?.path);
      const newProject = new BlogModel({
        Author: id?._id,
        category,
        title,
        summary,
        file: filepath?.url,
        content,
      });


      await newProject.save();

      return res.send({ success: true, msg: "Blog  added succesfully" });
    } else {
      return res.send({ success: false, msg: "please select a file" });
    }
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};

//  bog update route 

const UpdateBlogdata = async(req, res) => {
  

try {
  const { category, title, summary, content } = req.body;
  const id=req.params.id;
  console.log(req.file)
  console.log(id);
  if (req.file !== undefined && req?.file?.originalname.length > 0) {
    const filepath=await UploadOnCloudinary(req?.file?.path)
    const UpDateblog=await BlogModel.findByIdAndUpdate(id,{
      Author: id?.id,
      category,
      title,
      summary,
      file:filepath,
      content,
  
    })
    
    return res.send({ success: true, msg: "Blog  UPdated succesfully" });
  }else{
    console.log("mohit")
    const UpDateblog=await BlogModel.findByIdAndUpdate(id,{
      Author: id?.id,
      category,
      title,
      summary,
      content,
  
    })

    return res.send({ success: true, msg: "Blog  UPdated succesfully" });

  }
} catch (error) {
  console.log(error)
  return res.send({ success: false, msg: "Internal Server error" });
}


};

const DeleteBlogdata = async (req, res) => {

 try {
    const id=req.params.id;
    console.log(id)
     const DeleteBlog=await BlogModel.findByIdAndDelete(id);
     return res.send({ success: true, msg: "Blog Delete successfully" });
 } catch (error) {
    console.log(error)
    return res.send({ success: false, msg: "Internal Server error" });
 }

};

const GetBlogbyId = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const getblogdata = await BlogModel.findById(id).populate(
      "Author",
      ["name", "email", "avatar"]
    );;
    return res.send({ success: true, getblogdata });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};

const GetUserblogsdata = async (req, res) => {
  const id = req.newuser;
  
  try {
    const getuserblog = await BlogModel.find({ Author: id._id }).populate(
      "Author",
      ["name", "email",]
    );
    console.log(getuserblog);
    return res.send({ success: true, getuserblog });
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};


const Searchblogdata=async(req,res)=>{
  try {
const {search}=req.query;
console.log(search);
let query={};
if(search){
  query={
    $or:[
      { title: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ]
  }
  const data=await BlogModel.find(query).populate("Author", [
    "name",
    "email",
    "file"
  ]);;
  return res.status(200).send(data);
}

  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
}

export {
  Getblogdata,
  PostBlogdata,
  UpdateBlogdata,
  DeleteBlogdata,
  GetUserblogsdata,
  GetBlogbyId,
  Searchblogdata,
};
