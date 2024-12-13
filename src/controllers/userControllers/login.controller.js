import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { loginValidationSchema } from "../../utils/helper/validations/userValidationSchema.js";
import { loginService } from "../../services/userService.js";

const login = asyncHandler(async (req, res) => {
    // login data validation
    const userValidatedData = await loginValidationSchema.validateAsync(req.body);

    // call login service
    const response = await loginService(userValidatedData)

    const { isUserValid, isUserAuthenticated } = response;

    // if email is invalid then show error
    if (!isUserAuthenticated) {
        throw new ApiError(400, "Invalid credentials")
    }

    const options = {
        httpOnly: true,
        secure:true,
        // maxAge:"1d",
        expires: new Date(Date.now() + 25892000000),
    }

    // generate token for user
    const accessToken = await isUserValid.generateAccessToken();

    // set cookie 
    res.cookie("accessToken", accessToken, options)

    // return response to frontend
    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    user: {
                        email: isUserValid.email,
                        userName: isUserValid.userName,
                        isLoggedIn: true
                    }
                },

                "logged in successfully !"
            )
        )
})

export { login }