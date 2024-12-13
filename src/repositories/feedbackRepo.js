import { Feedback } from "../models/feedback.model.js";
import { ApiError } from "../utils/helper/ApiError.js";

const getAllFeedbacks=async(feedbackId)=>{
    try {
        return await Feedback.find();
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const createFeedbackRepo = async (feedbackValidatedData) => {
    try {
        console.log("kadaki",feedbackValidatedData)
        return await Feedback.create(feedbackValidatedData);
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const deleteFeedbackRepo = async (feedbackId) => {
    try {
        return await Feedback.findByIdAndDelete({
            _id: feedbackId
        }
        )
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

const updateFeedbackRepo = async (feedbackId, feedbackUpdatedData) => {
    try {
        return await Feedback.findByIdAndUpdate(
            {
                _id: feedbackId
            },
            {
                ...feedbackUpdatedData
            },
            {
                new: true
            }
        )
    } catch (error) {
        throw new ApiError(error.statusCode, error);
    }
}

export {
    getAllFeedbacks,
    createFeedbackRepo,
    deleteFeedbackRepo,
    updateFeedbackRepo
}