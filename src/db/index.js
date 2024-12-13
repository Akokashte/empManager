import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDb = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("mongodb connected")
    } catch (err) {
        console.log("mongodb connection error !",err)
    }
}

export default ConnectDb;