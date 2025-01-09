import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  authRegisterSchema,
  authLoginSchema,
} from "../validation/authSchema.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController)
);

authRouter.post(
  "/login",
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginController)
);

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));

export default authRouter;
