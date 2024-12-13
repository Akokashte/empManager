import { deleteFeedbackService } from "../../services/feedbackService.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";


const deleteFeedback = asyncHandler(async (req, res) => {
    const { feedbackId } = req.body;

    const { isFeedbackDeleted, message } = await deleteFeedbackService(feedbackId);

    if (!isFeedbackDeleted) {
        throw new ApiError(500, message);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { isFeedbackDeleted },
                message
            )
        )
})

export default deleteFeedback;