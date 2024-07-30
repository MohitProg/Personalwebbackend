import express from "express";
import {getProject,updateproject,postproject,deleteproject} from "../Controllers/ProjectController.js"
import AuthCheck from "../Middleware/Auth.js";
import { upload } from "../Middleware/multer.middleware.js";
const route=express.Router();



route.get("/getproject",getProject)
route.post("/postproject",AuthCheck,upload.single("file"),postproject)
route.put("/updateproject/:id",AuthCheck,upload.single("file"),updateproject)
route.delete("/deleteproject/:id",AuthCheck,deleteproject)


export default route;
