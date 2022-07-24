import { Router } from "express";
import validSchema from "../middlewares/validSchema.js";
import userSchema from "../schemas/userSchema.js";
import { signUp, signIn } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup", validSchema(userSchema), signUp);
authRouter.post("/signin", validSchema(userSchema), signIn);

export default authRouter;
