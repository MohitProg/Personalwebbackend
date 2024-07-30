import Usermodel from "../Modals/Usermodel.js";
import { check, validationResult } from "express-validator";
import { ApiError } from "../Utils/ApiError.js";
import { UploadOnCloudinary } from "../Utils/Cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

//  signup User

const SigninUser = async (req, res) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ success: "error", errors: errors.array() });
  }

  try {
    const existuser = await Usermodel.findOne({ $or: [{ name }, { email }] });

    if (existuser) {
      return res.send(new ApiError(409, "User with name already exist"));
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.send(new ApiError(409, "Please Select and Image"));
    }

    const avatar = await UploadOnCloudinary(avatarLocalPath);

    const User = new Usermodel({
      name,
      email,
      avatar: avatar.url,
      password,
    });

    await User.save();

    const CreateNewuser = await Usermodel.findById(User?._id).select(
      "-password -refreshToken"
    );

    if (!CreateNewuser) {
      return res.send(new ApiError(500, "Something went wrong"));
    }

    return res
      .status(201)
      .json(
        new ApiResponse(200, CreateNewuser, "user registered successfully")
      );
  } catch (error) {
    res.send({ success: false, msg: "Internal Server" });
  }
};

//  login user

const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ success: "error", errors: errors.array() });
  }

  try {
    const existuser = await Usermodel.findOne({ email });

    if (!existuser) {
      return res.send({ success: false, msg: "User does't exist" });
    }

    const passwordVerify = await existuser.isCorrectpassword(password);
    console.log(passwordVerify);

    if (!passwordVerify) {
      return res.send({ success: false, msg: "Enter correct password" });
    }

    const token = await existuser.generateAccessToken();
    if (!token) {
      return res.send(new ApiError(401, "Invalid credencials"));
    }

    existuser.refreshToken = token;
    existuser.save({ validateBeforeSave: false });

    const loggedInUser = await Usermodel.findById(existuser._id).select(
      "-password "
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", token, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
          },

          "user login successfully"
        )
      );
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: "Internal Server error" });
  }
};

//  update user
const updateUser = async (req, res) => {
  try {
    const { name, desc, file } = req.body;
    const id = req.newuser;
    console.log(id._id);

    if (req.file === undefined) {
      const updateuser = await Usermodel.findByIdAndUpdate(id._id, {
        name,
        desc,
      });
    } else if (req.file !== undefined) {
      const { originalname, path } = req.file;
      const avatar = await UploadOnCloudinary(path);

      if (!avatar) {
        return res.status(401).send(new ApiError(401, "photo not uploaded"));
      }
      const updateuser = await Usermodel.findByIdAndUpdate(
        id._id,
        {
          $set: {
            id,
            name,
            desc,
            avatar: avatar.url,
          },
        },
        { new: true }
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "User updated successfully"));
  } catch (error) {
    console.log(error);
    res.send({ success: false, msg: "Internal Server error" });
  }
};

//  delete User
const deleteUser = async (req, res) => {
  const id = req.newuser;
  console.log(id);

  try {
    const deleteuser = await Usermodel.findByIdAndDelete(id._id);

    console.log(deleteuser);
    if (!deleteUser) {
      return res.send({ success: false, msg: "user Doesn't Delete" });
    }

    return res
      .status(201)
      .json(new ApiResponse(200, "user delete successfully"));
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};

//  get user data

const getUserdata = async (req, res) => {
  const id = req.newuser;
  console.log(id);
  try {
    if (!id) {
      return res.send({ success: false, msg: "Internal Server error" });
    }

    const userdata = await Usermodel.findById(id._id);
    return res
      .status(201)
      .json(new ApiResponse(200, userdata, "user registered successfully"));
  } catch (error) {
    console.log(error);
    return res.send({ success: false, msg: "Internal Server error" });
  }
};

export { SigninUser, LoginUser, updateUser, deleteUser, getUserdata };
