import { User } from "../models/user.model.js";
import { ApiError } from "../utils/helper/ApiError.js";

const createUserRepo = async (userData) => {
    try {
        const userCreated = await (await User.create(userData))

        if (!userCreated) {
            return { user: "", isUserCreated: false}
        }

        return { user: userCreated, isUserCreated: true };
    } catch (error) {
        throw new ApiError(error.statusCode, error)
    }
}

const findUserByEmailRepo = async (email) => {
    try {
        return await User.findOne(email);
    } catch (error) {
        throw new ApiError(error.statusCode, error)
    }
}

export {
    createUserRepo,
    findUserByEmailRepo,
}