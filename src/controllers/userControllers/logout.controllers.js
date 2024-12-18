import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const logout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken",{
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: 'None',
        path:'/'
    })
    // res.clearCookie("accessToken")

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