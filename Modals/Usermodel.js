import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { ApiError } from "../Utils/ApiError.js";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    desc: {
      type: String,
      default: "Add your Description",
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    avatar: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return null;
    this.password = await bcrypt.hash(this.password, 10);
    next();
  }
);

userSchema.methods.isCorrectpassword = async function (password) {
 
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken= async function(){
  try {
    const option={
      httpOnly:true,
      secure:true,
    }
    const token= jwt.sign(
      {_id:this._id},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:process.env.ACCESS_TOKEN_EXPIRE}
    )

   return token

  } catch (error) {
    console.log(error);
    throw new ApiError(400,"Internal server problem")
  }
}

export default mongoose.model("User", userSchema);
