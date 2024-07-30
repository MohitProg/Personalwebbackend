import mongoose, { Schema } from "mongoose";
const blogSchema=new mongoose.Schema({

    Author:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },

    category:{
        type:String,
        required:true
    },
    
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },

    file:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },

    
    
   

},{timestamps:true});


export default mongoose.model("blog",blogSchema)