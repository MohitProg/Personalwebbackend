import mongoose, { Schema, Types } from "mongoose";
const blogSchema=new mongoose.Schema({

    Author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    category:{
        type:Array,
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

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],


   

    
    
   

},{timestamps:true});


export default mongoose.model("blog",blogSchema)