import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import asyncHandler from "express-async-handler";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Unauthorized request !!! ",
      });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid access Token ",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Something went wrong while verifying JWT",
    });
  }
});

export { verifyJWT };
