import mongoose from "mongoose";

const commentSchema=new mongoose.Schema({
    Blogid:{
        type:String,
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },

    comment:{
        type:String,
        required:true
    }


},{timestamps:true});


export default mongoose.model("comments",commentSchema)