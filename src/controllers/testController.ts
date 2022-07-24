import { Request, Response } from "express";
import testService from "../services/testService.js";

export async function getByDiscipline(req: Request, res: Response) {
    const byDicipline = await testService.getByDiscipline();
    res.status(200).send(byDicipline);
}
