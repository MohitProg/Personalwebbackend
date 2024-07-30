import mongoose, { Schema } from "mongoose";
const projectSchema= new mongoose.Schema({
    projecttitle:{
        type:String,
        required:true
    },
    Author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    file:{
        type:String,
        required:true
    },
    prodescription:{
        type:String,
        required:true
    },
    proUrl:{
        type:String,
        required:true
    }
})

export default mongoose.model("project",projectSchema);