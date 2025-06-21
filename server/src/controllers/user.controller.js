import AsyncHandler from "../utils/AsyncHandler.js";
import userSchema from "../models/user.model.js";
import { uploadImage } from "../utils/cloudinary.js";

const searchUsers = AsyncHandler(async (req, res) => {
  const query = req.query.search;

  if (!query || query.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search query is required.",
    });
  }
  const keyword = req.query.search
    ? {
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    }
    : {};

  const users = await userSchema
    .find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .select("-password -refreshToken");

  return res.status(200).json({
    users,
    message: "users found successfully",
  });
});

const updateUserInfo = AsyncHandler(async (req, res) => {
  const { fullName, bio, avatar, interests } = req.body;
  console.log(req.body);

  const updates = {};
  if (fullName !== undefined) updates.fullName = fullName;
  if (bio !== undefined) updates.bio = bio;
  if (avatar !== undefined) updates.avatar = avatar;
  if (interests !== undefined) updates.interests = interests;

  let profilePicPath = "";
  if (req.file) {
    profilePicPath = req.file.path;
  }

  let profilePic = ""
  if (profilePicPath) {
    const picName = req.file?.filename;
    const currentUser = await userSchema.findById(req.user._id);

    // If current avatar is a Cloudinary URL, delete it
    if (currentUser.avatar && currentUser.avatar.includes("res.cloudinary.com") && currentUser.avatar === "https://res.cloudinary.com/du4bs9xd2/image/upload/v1750344689/profile_image_srdpjg.png") {
      const segments = currentUser.avatar.split("/");
      const publicIdWithExtension = segments[segments.length - 1]; // e.g., "filename.jpg"
      const publicId = publicIdWithExtension.split(".")[0]; // e.g., "filename"
      await deleteImage(publicId);
    }
    profilePic = await uploadImage(profilePicPath, picName);
  }
  if (profilePic && profilePic.secure_url) {
    updates.avatar = profilePic.secure_url;
  }

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: "No valid fields provided for update.",
    });
  }

  const updatedUser = await userSchema.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    { new: true, runValidators: true, select: "-password -refreshToken" }
  );

  res.status(200).json({
    success: true,
    message: "User profile updated successfully.",
    user: updatedUser,
  });
});

export { searchUsers, updateUserInfo };
