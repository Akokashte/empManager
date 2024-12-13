import mongoose, { Schema } from "mongoose";

const feedbackSchema = new Schema({
    feedback: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.ObjectId,
        required: true
    }
},
    {
        timestamps: true
    }
)

export const Feedback = mongoose.model("Feedback", feedbackSchema);