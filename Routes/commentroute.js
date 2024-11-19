import { Router } from "express";
import { deletecomment, getComment, postComment, updateComment } from "../Controllers/commentController.js";
import AuthCheck from "../Middleware/Auth.js";
const route=Router();


route.get("/getcomment/:id",getComment);
route.post("/postcomment/:id",AuthCheck,postComment);
route.delete("/deletecomment/:id",AuthCheck,deletecomment);
route.put("/updatecomment",AuthCheck,updateComment);


export default route;