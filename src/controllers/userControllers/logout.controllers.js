import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const logout = asyncHandler(async (req, res) => {
    // res.clearCookie("accessToken")
    res.clearCookie('accessToken', '', {
        httpOnly: true,
        secure: true, // if using HTTPS
        sameSite: 'None', // ensure consistency with the original cookie settings
      });
    return res.status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isLoggedOut: true
                }
                ,
                "logged out successfully"
            )
        )
})

export default logout;