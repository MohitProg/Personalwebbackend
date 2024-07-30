import express from "express";
import AuthCheck from "../Middleware/Auth.js";

import { upload } from "../Middleware/multer.middleware.js";

import {Getblogdata,PostBlogdata,Searchblogdata,UpdateBlogdata,DeleteBlogdata, GetUserblogsdata, GetBlogbyId} from "../Controllers/BlogControll.js"

const route=express.Router();


route.get("/getblogs",Getblogdata);
route.get("/searchblog",Searchblogdata)
route.get("/getblogs/:id", GetBlogbyId)
route.get("/getuserblogs", AuthCheck,GetUserblogsdata)
route.post("/postblogs",AuthCheck,upload.single("file"),PostBlogdata)
route.put("/updateblog/:id",AuthCheck, upload.single("file"),UpdateBlogdata)
route.delete("/deleteblog/:id",AuthCheck,DeleteBlogdata)

export default route;