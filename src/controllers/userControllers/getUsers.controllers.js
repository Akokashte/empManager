import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/helper/ApiError.js";
import ApiResponse from "../../utils/helper/ApiResponse.js";
import { asyncHandler } from "../../utils/helper/AsyncHandler.js";

const getUsers=asyncHandler(async(req,res)=>{
    const users = await User.find();

    if(!users){
        throw new ApiError(500,"error while fetching users !!");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            users,
            "user fetched successfully !"
        )
    )
})

export default getUsers;