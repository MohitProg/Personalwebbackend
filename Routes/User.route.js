import express from "express";
import {upload} from "../Middleware/multer.middleware.js"

import { body, validationResult } from "express-validator";
import { SigninUser, LoginUser, updateUser, deleteUser,getUserdata } from "../Controllers/UserControll.js";
import AuthCheck from "../Middleware/Auth.js";
const route = express.Router();



route.route("/signup").post(upload.single('avatar'),[
  [
    body("name").isLength({min:5}).withMessage("Name must be more than 5 Character"),
    // body("email").isEmail().withMessage("Enter valid Email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be more than 6 character"),
  ],
],SigninUser)

route.post("/login", [
  [

    body("email").isEmail().withMessage("Enter valid Email"),
    body("password").isLength({ min: 5 }).withMessage("Password must be more than 6 character"),
  ],
], LoginUser);


route.put("/update",AuthCheck,upload.single("avatar"), updateUser);
route.delete("/delete",AuthCheck, deleteUser);
route.get("/getuser",AuthCheck,getUserdata);


export default route;