import { Router } from "express";
import validToken from "../middlewares/validToken.js";
import {
    getByDiscipline,
    getByTeacher,
} from "../controllers/testController.js";

const testRouter = Router();

testRouter.get("/test/discipline", validToken, getByDiscipline);
testRouter.get("/test/teacher", validToken, getByTeacher);

export default testRouter;
