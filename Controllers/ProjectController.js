import ProjectModel from "../Modals/ProjectModel.js"
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";

const getProject=async(req,res)=>{
try {
    const getproject =await ProjectModel.find().populate("Author", [
        "name",
        "email",
        "file"
      ]);
      console.log(getproject);
      return res.send({ success: true, getproject });
} catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
}
}

const postproject=async(req,res)=>{
    const id = req.newuser;
    console.log(id.id);
    console.log(req.body);
  
    try {
      const { projecttitle,prodescription,proUrl} = req.body;
  
      if (req.file !== undefined && req?.file?.originalname.length > 0) {
        const filepath= await UploadOnCloudinary(req?.file?.path)
        const newProject = new ProjectModel({
          Author: id?.id,
          projecttitle,
          prodescription,proUrl,
          file: filepath?.url,
        });
  
        console.log(newProject);
        await newProject.save();
  
        return res.send({ success: true, msg: "Project  added succesfully" });
      } else {
        return res.send({ success: false, msg: "please select a file" });
      }
    } catch (error) {
      console.log(error);
      return res.send({ success: false, msg: "Internal Server error" });
    }
}

const updateproject=async(req,res)=>{
    try {
        const { projecttitle, file, prodescription, proUrl } = req.body;
        const id=req.params.id;
      
        if (req.file !== undefined && req?.file?.originalname.length > 0) {
          const filepath= await UploadOnCloudinary(req?.file?.path)
          const UpDateblog=await ProjectModel.findByIdAndUpdate(id,{
            Author: id?.id,
            projecttitle,
            prodescription,
            proUrl,
        
            file: filepath,
            content,
        
          })
          
          return res.send({ success: true, msg: "Project  UPdated succesfully" });
        }else{
          console.log("mohit")
          const UpDateblog=await ProjectModel.findByIdAndUpdate(id,{
            Author: id?.id,
            projecttitle,
            prodescription,
            proUrl,
          })
      
          return res.send({ success: true, msg: "Blog  Project succesfully" });
      
        }
      } catch (error) {
        console.log(error)
        return res.send({ success: false, msg: "Internal Server error" });
      }
}

const deleteproject=async(req,res)=>{
    try {
        const id=req.params.id;
        console.log(id)
         const DeleteBlog=await ProjectModel.findByIdAndDelete(id);
         return res.send({ success: true, msg: "Project Delete successfully" });
     } catch (error) {
        console.log(error)
        return res.send({ success: false, msg: "Internal Server error" });
     }
}


export{getProject,updateproject,deleteproject,postproject}