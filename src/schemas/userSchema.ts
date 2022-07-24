import { User } from "@prisma/client";
import Joi from "joi";

const userSchema = Joi.object<User>({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export default userSchema;
