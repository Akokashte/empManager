import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { signUpValidationSchema } from "../../utils/helper/validations/userValidationSchema.js";
import { createUser } from "../../services/userService.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { ApiError } from "../../utils/helper/ApiError.js";

const signUp = asyncHandler(async (req, res) => {
    // validations for user data
    const userData = await signUpValidationSchema.validateAsync(req.body);

    const { user, isUserCreated } = await createUser(userData)

    if (!isUserCreated) {
        throw new ApiError(500, "Unable to create user already exist")
    }

    // set cookie options
    const options = {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: 'Strict'
    }

    const accessToken = user.generateAccessToken();

    // send cookie
    res.cookie("accessToken", accessToken, options)

    // send response with statuscode to frontend
    return res.status(201)
        .json(
            new ApiResponse(
                201,
                {
                    user: {
                        email: user.email,
                        userName: user.userName,
                        isLoggedIn: true
                    }
                },
                "user registered successfully !"
            )
        )
})

export { signUp }