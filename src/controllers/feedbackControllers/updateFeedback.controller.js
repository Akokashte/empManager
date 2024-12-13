import { updateFeedbackService } from "../../services/feedbackService.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";


const updateFeedback = asyncHandler(async (req, res) => {
    const { feedbackId, feedbackUpdatedData } = req.body;
    console.log(feedbackId,feedbackUpdatedData)

    const { isFeedbackUpdated, message } = await updateFeedbackService(feedbackId, feedbackUpdatedData);

    if (!isFeedbackUpdated) {
        throw new ApiError(500, message);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    isFeedbackUpdated
                },
                message
            )
        )
})

export default updateFeedback;