import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import userService from "../services/userService.js";
import tokenSchema from "../schemas/tokenSchema.js";
import "../config/config.js";
import { Session } from "@prisma/client";

export default async function validToken(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    const tokenValidation = await tokenSchema.validate(token);
    if (tokenValidation.error) throw { type: "unauthorized" };

    try {
        const session = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.user = await userService.findBySession(session.session);
    } catch (err) {
        throw { type: "unauthorized" };
    }
    next();
}
