import Joi from "joi";

const feedbackValidationSchema = Joi.object({
    feedback: Joi.string().required(),
})

export {
    feedbackValidationSchema
}