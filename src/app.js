import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express()

const allowedOrigins = process.env.CORS_ORIGIN;

app.use(cors(
    {
        CORS_ORIGIN: "https://gilded-moxie-472b0e.netlify.app",
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
    }
))

// const corsOptions = {
//     origin: (origin, callback) => {
//         // Check if the incoming origin is in the allowedOrigins list
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);  // Allow the request
//         } else {
//             callback(new Error('Not allowed by CORS'));  // Deny the request
//         }
//     },
//     methods: ['GET', 'POST','PATCH', 'PUT', 'DELETE'],  // Customize allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization'],  // Customize allowed headers
//     credentials: true,
// };

// CORS options
app.use(cors(corsOptions))


//It is the process of converting a JSON string to a JSON object for data manipulation
app.use(express.json())

// used to deal with urls
app.use(express.urlencoded({ extended: true }))

// configuration for static files such as images and other files
app.use(express.static("public"))

// used to perform crud operations on cookie data
app.use(cookieParser())

// import routes and middlewares here
import userRouter from "./routes/user.routes.js";
import feedbackRouter from "./routes/feedback.routes.js";

app.use("/api/v1/user", userRouter)
app.use("/api/v1/feedback", feedbackRouter);

export { app }
