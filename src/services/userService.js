import { createUserRepo, findUserByEmailRepo } from "../repositories/userRepo.js"
import { ApiError } from "../utils/helper/ApiError.js";

const createUser = async (userData) => {
    try {
        // check whether email already registered 
        const userExist = await findUserByEmailRepo({ email: userData.email })

        // if email already exist then show error
        if (userExist) {
            return { user: "", isUserCreated: false }
        }

        return await createUserRepo(userData)
    } catch (error) {
        throw new ApiError(error.statusCode, error)
    }
}

const loginService = async (userValidatedData) => {
    try {
        const { email, password } = userValidatedData;

        // check user credentials email valid or not
        const isUserValid = await findUserByEmailRepo({ email })

        if (!isUserValid) {
            return { isUserValid, isUserAuthenticated: false }
        }

        // check for correctness of password
        const passwordCorrect = await isUserValid.isPasswordCorrect(password)

        // if password is invalid then show error
        if (!passwordCorrect) {
            return { isUserValid, isUserAuthenticated: false }
        }

        return {
            isUserValid,
            isUserAuthenticated: true
        }

    } catch (error) {
        throw new ApiError(error.statusCode, error)
    }
}



export {
    createUser,
    loginService,
}