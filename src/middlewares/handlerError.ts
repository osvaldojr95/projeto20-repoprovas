import { Request, Response, NextFunction } from "express";

export default async function handlerError(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error.type) {
        switch (error.type) {
            case "unauthorized":
                return res.sendStatus(401);

            case "notFound":
                return res.sendStatus(404);

            case "conflict":
                return res.sendStatus(409);

            case "unprocessableEntity":
                return res.sendStatus(422);

            default:
                break;
        }
    }
    console.log("Error: ", error);
    return res.sendStatus(500);
}
