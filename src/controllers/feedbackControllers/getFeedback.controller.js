import { getAllFeedbacksService } from "../../services/feedbackService.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";


const getFeedback = asyncHandler(async (req, res) => {
    const { feedbackData, message } = await getAllFeedbacksService();

    return res.
        status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isFeedbackFetched:true,
                    feedbackData
                },
                message
            )
        )
})

export default getFeedback;