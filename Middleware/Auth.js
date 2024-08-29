import jwt from "jsonwebtoken";

const AuthCheck = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    console.log(token)

    if (!token) {
      return res.send({ success: false, msg: "please provide jwt token" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decode)

    req.newuser = decode;
    next();
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: "token is not found" });
  }
};

export default AuthCheck;
