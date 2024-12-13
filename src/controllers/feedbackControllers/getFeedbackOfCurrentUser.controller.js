import { Feedback } from "../../models/feedback.model.js";
import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import jwt from "jsonwebtoken";

const getFeedbackOfCurrentUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request !!");
    }

    const decodedTokenData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedTokenData?._id).select("-password")

    const feedbacksOfCurrentUser = await Feedback.find({ userId: user?._id });

    if (feedbacksOfCurrentUser.length === 0) {
        return res.
            status(200)
            .json(
                new ApiResponse(
                    200,
                    "",
                    "No feedbacks posted yet !"
                )
            )
    }

    return res.
        status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isFeedbackFetched: true,
                    feedbacks: feedbacksOfCurrentUser
                },
                "Feedbacks fetched successfully !"
            )
        )
})

export default getFeedbackOfCurrentUser;