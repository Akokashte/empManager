import { Router } from "express";

// import controllers here
import createFeedback from "../controllers/feedbackControllers/createFeedback.controller.js";
import getFeedback from "../controllers/feedbackControllers/getFeedback.controller.js";
import deleteFeedback from "../controllers/feedbackControllers/deleteFeedback.controller.js";
import updateFeedback from "../controllers/feedbackControllers/updateFeedback.controller.js";
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
import getFeedbackOfCurrentUser from "../controllers/feedbackControllers/getFeedbackOfCurrentUser.controller.js";

const router = Router();

router.route("/get")
    .get(verifyJwt,
        getFeedback)

router.route("/get/logged/user/feedbacks")
    .get(getFeedbackOfCurrentUser)

router.route("/create")
    .post(verifyJwt,
        createFeedback)

router.route("/delete")
    .delete(verifyJwt,
        deleteFeedback)

router.route("/update")
    .patch(verifyJwt,
        updateFeedback)


export default router;