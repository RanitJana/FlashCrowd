import User from "../models/user.model";
import AsyncHandler from "../utils/AsyncHandler";


const getUserInfo = async (accessToken) => {
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user info");
    }

    const data = await response.json();
    console.log("User info:", data);
    return data;
};

const registerUser = AsyncHandler(async (req, res) => {

    /**
     * s#1: take ref token from cookies
     * s#2: decode the token 
     * s#3: check if the user exists in the database
     * s#4: if user exists, return the user data
     * s#5: if user does not exist, create a new user and return the user data
     */

    // s#1
    const { accessToken } = req.cookies;

    // s#2
    const userInfo = await getUserInfo(accessToken);
    console.log("Decoded user info:", userInfo);
    if (!userInfo) {
        return res.status(400).json({
            success: true,
            message: "Invalid access token or user info not found"
        });
    }

    // s#3
    const user = await User.findOne({ email: userInfo.email });

    // s#4
    if (user) {
        return res
            .status(200)
            .json({
                success: true,
                message: "User already exists",
                user: user
            });
    }

    // s#5
    const newUser = await User.create({
        fullName: userInfo.name,
        email: userInfo.email,
        isOAuthUser: true,
        avatar: userInfo.picture,
    })

    if (!newUser) {
        return res.status(500).json({
            success: false,
            message: "Failed to create user"
        });
    }
    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: newUser
    });

});



export {
    registerUser,

}