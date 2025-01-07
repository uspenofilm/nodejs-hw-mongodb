import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { authRegisterSchema } from "../validation/authSchema.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import * as authControllers from "../controllers/auth.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerController)
);

export default authRouter;
