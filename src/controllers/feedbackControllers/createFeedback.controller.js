import { createFeedbackService } from "../../services/feedbackService.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";
import { feedbackValidationSchema } from "../../utils/helper/validations/feedbackValidationSchema.js";


const createFeedback = asyncHandler(async (req, res) => {
    const feedbackValidatedData = await feedbackValidationSchema.validateAsync(req.body);

    const { isFeedbackCreated, message } = await createFeedbackService({...feedbackValidatedData,userId:req.user._id});

    if (!isFeedbackCreated) {
        throw new ApiError(500, message);
    }

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {
                    isFeedbackCreated
                }
                ,
                message
            )
        )
})

export default createFeedback;