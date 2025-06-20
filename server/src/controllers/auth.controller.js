import User from "../models/user.model";
import AsyncHandler from "../utils/AsyncHandler";


const generateAccessAndRefreshTokens = async (userId) => {      // generate access and refreshtoken and update in db
    /*
     * generate Access and Refresh Token,
     * Update refresh Token into db ( just update refreshToken, else untouched )
     * return Access and Refresh Token
     */

    try {
        const user = await User.findById(userId);

        // generate Access and Refresh Token,
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Update refresh Token into db 
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // return Access and Refresh Token
        return { accessToken, refreshToken };
    } catch (error) {
        res
            .status(500)
            .json({
                message: "Something went wrong while generating tokens"
            })
    }
};


const registerUser = AsyncHandler(async (req, res) => {

    /**
     * s#1: take input from the req.body
     * s#2: check if the user exists in the database, or create a new user
     * s#4: generate access and refresh tokens for the user._id and update in db
     * s#5: if user does not exist, create a new user and return the user data
     */

    const { name, email, picture } = req.body

    try {
        const user = await User.findOne({ email });

        if (!user || !name || !email) {
            user = await User.create({
                name,
                email,
                avatar: picture,
            })

            if (!user) {
                return res
                    .status(400)
                    .json({
                        message: "User not created, please try again"
                    });
            }
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
            user._id
        );

        const loggedInUser = await User.findById(user._id).select(
            "-password -refreshToken"
        ).lean();

        loggedInUser.refreshToken = refreshToken;

        const options = {
            httpOnly: true,
            secure: true,
        };

        res.setHeader('Authorization', `Bearer ${accessToken}`);

        return res
            .status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: loggedInUser
            })
    } catch (error) {
        return res
            .status(500)
            .json({
                message: "Something went wrong while registering user"
            });

    }

});



export {
    registerUser,

}