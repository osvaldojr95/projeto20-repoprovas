import { Router } from "express";
import validToken from "../middlewares/validToken.js";
import {
    getByDiscipline,
    getByTeacher,
    insertTest,
} from "../controllers/testController.js";
import validSchema from "../middlewares/validSchema.js";
import testSchema from "../schemas/testSchema.js";

const testRouter = Router();

testRouter.get("/test/discipline", validToken, getByDiscipline);
testRouter.get("/test/teacher", validToken, getByTeacher);
testRouter.post("/test", validToken, validSchema(testSchema), insertTest);

export default testRouter;
