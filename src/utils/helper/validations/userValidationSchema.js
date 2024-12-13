import Joi from "joi";

const signUpValidationSchema = Joi.object(
    {
        userName: Joi.string().max(100).min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]).{8,}$')).required(),
        confirmPassword: Joi.ref('password'),
    }
)

const loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\\[\\]:;<>,.?~\\-]).{8,}$')).required()
})

export { signUpValidationSchema, loginValidationSchema }