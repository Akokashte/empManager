import { User } from "../../models/user.model.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import jwt from "jsonwebtoken";

const checkIsUserLoggedIn = asyncHandler(async (req, res) => {
    const accessToken = await req.cookies.accessToken;

    if (!accessToken) {
        return res.json(
            new ApiResponse(
                401,
                {
                    isLoggedIn: false
                },
                "Unauthorized !"
            )
        )
    }

    const userVerified = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    if (!userVerified) {
        return res.json(
            new ApiResponse(
                401,
                {
                    isLoggedIn: false
                },
                "Unauthorized !"
            )
        )
    }

    const user = await User.findOne({ _id: userVerified._id }).select("-password");

    if (!user) {
        return res.json(new ApiResponse(
            401,
            {
                isLoggedIn: false
            },
            "Unauthorized !"
        ))
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: {
                        email: user.email,
                        userName: user.userName,
                        isLoggedIn: true
                    }
                },
                "logged in successfully !"
            )
        )
})

export {
    checkIsUserLoggedIn
}