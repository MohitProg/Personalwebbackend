import jwt from "jsonwebtoken";
import { ApiResponse } from "../Utils/ApiResponse.js";

const AuthCheck = async (req, res, next) => {
  try {
    const token = req.header("auth-token")?.split(" ")[1];
  
   
    if (!token) {
      return res.send(new ApiResponse(200,"","Authentication Required"));
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decode)

    req.newuser = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: error.message });
  }
};

export default AuthCheck;
