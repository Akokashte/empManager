import { User } from "../models/user.model.js";
import { ApiError } from "../utils/helper/ApiError.js";
import { asyncHandler } from "../utils/helper/AsyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJwt = asyncHandler(async (req, _, next) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request !!");
    }

    const decodedTokenData = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodedTokenData?._id).select("-password")

    if (!user) {
        throw new ApiError(401, "Invalid access token !")
    }

    req.user = user;
    next();

})

export {
    verifyJwt
}