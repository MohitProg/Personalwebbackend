import CommentModal from "../Modals/CommentModal.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

export const getComment=async(req,res)=>{
    const blogid=req.params.id
    try {

        const comments=await CommentModal.find({Blogid:blogid}).populate("senderId");
        return res
        .status(201)
        .send(new ApiResponse(200,comments, "get comment of the blog "));
        
    } catch (error) {
        console.log(error)
        res.send({ success: false, message: error.message });

    }

}


// post comment on a blog 
export const postComment=async(req,res)=>{
    const userid=req.newuser._id
    const blogid=req.params.id
    try {
        
        const {comment}=req.body;
    // Create a new comment document
    const commentonpost = new CommentModal({
        senderId: userid,
        Blogid: blogid,
        comment
    });

    // Save the document
    let commentdata = await commentonpost.save();

    // Populate the `senderId` field in the saved document
    commentdata = await commentdata.populate("senderId");

    return res.status(201).send(
        new ApiResponse(200, commentdata, "Comment added successfully")
    );
    

    } catch (error) {
        console.log(error);
        res.send({ success: false, message: error.message });
    }
    
}

// delete comment on blog 

export const deletecomment=async(req,res)=>{
    const userid=req.newuser._id
    const commentid=req.params.id

    try {

        await CommentModal.findByIdAndDelete({_id:commentid});
        return res.status(201).send(
            new ApiResponse(200, [], "Comment deleted successfully")
        );
        
        
    } catch (error) {
        console.log(error);
        res.send({ success: false, message: error.message });
    }

    
}


// update comment on a blog 

export const updateComment=()=>{

}