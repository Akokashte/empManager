import { Router } from "express";

// import controllers and middlewares here
import { login } from "../controllers/userControllers/login.controller.js";
import { signUp } from "../controllers/userControllers/signup.controllers.js";
import getUsers from "../controllers/userControllers/getUsers.controllers.js";
import logout from "../controllers/userControllers/logout.controllers.js";
import { checkIsUserLoggedIn } from "../controllers/userControllers/checkIsUserLoggedIn.controllers.js";

const router = Router();

router.route("/login")
.post(login)

router.route("/signup")
.post(signUp)

router.route("/get")
.get(getUsers)

router.route("/logout")
.post(logout)

router.route("/check/islogeed/in")
.post(checkIsUserLoggedIn)

export default router;