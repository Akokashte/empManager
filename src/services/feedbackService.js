import { ApiError } from "../utils/helper/ApiError.js";
import { createFeedbackRepo, deleteFeedbackRepo, getAllFeedbacks, updateFeedbackRepo } from "../repositories/feedbackRepo.js";

const getAllFeedbacksService = async () => {
    try {
        const feedbackData = await getAllFeedbacks();
        if (!feedbackData) {
            return {
                feedbackData: "",
                message: "No feedbacks posted by you !!"
            }
        }

        return {
            feedbackData,
            message: "feedbacks fetched successfully !"
        }
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const createFeedbackService = async (feedbackValidatedData) => {
    try {
        console.log('mastj j',feedbackValidatedData)
        const feedbackCreated = await createFeedbackRepo(feedbackValidatedData);
        if (!feedbackCreated) {
            return {
                isFeedbackCreated: false,
                message: "Error while creating feedback"
            }
        }

        return {
            isFeedbackCreated: true,
            message: "feedbacks created successfully !"
        }
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const deleteFeedbackService = async (feedbackId) => {
    try {
        const feedbackDeleted = await deleteFeedbackRepo(feedbackId);
        console.log(feedbackDeleted)
        if (!feedbackDeleted) {
            return {
                isFeedbackDeleted: false,
                message: "Error while deletion of feedback"
            }
        }

        return {
            isFeedbackDeleted: true,
            message: "feedbacks deleted successfully !"
        }
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const updateFeedbackService = async (feedbackId, feedbackUpdatedData) => {
    try {
        const feedbackUpdated = await updateFeedbackRepo(feedbackId, feedbackUpdatedData);
        if (!feedbackUpdated) {
            return {
                isFeedbackUpdated: false,
                message: "Error while updation of feedback"
            }
        }

        return {
            isFeedbackUpdated: true,
            message: "feedbacks updated successfully !"
        }
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

export {
    getAllFeedbacksService,
    createFeedbackService,
    deleteFeedbackService,
    updateFeedbackService
}