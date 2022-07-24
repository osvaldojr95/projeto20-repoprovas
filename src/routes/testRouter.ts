import { Router } from "express";
import validToken from "../middlewares/validToken.js";
import { getByDiscipline } from "../controllers/testController.js";

const testRouter = Router();

testRouter.get("/test/discipline", validToken, getByDiscipline);

export default testRouter;
