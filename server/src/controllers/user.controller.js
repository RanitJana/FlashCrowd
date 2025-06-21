import AsyncHandler from "../utils/AsyncHandler.js";
import userSchema from "../models/user.model.js";

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
    const { fullName, bio, avatar, interest } = req.body;

    const updates = {};
    if (fullName !== undefined) updates.fullName = fullName;
    if (bio !== undefined) updates.bio = bio;
    if (avatar !== undefined) updates.avatar = avatar;
    if (interest !== undefined) updates.interest = interest;

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
