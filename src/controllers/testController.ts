import { Request, Response } from "express";
import categoryService from "../services/categoryService.js";
import teacherDisciplineService from "../services/teacherDisciplineService.js";
import testService from "../services/testService.js";

export async function getByDiscipline(req: Request, res: Response) {
    const byDicipline = await testService.getByDiscipline();
    res.status(200).send(byDicipline);
}

export async function getByTeacher(req: Request, res: Response) {
    const byTeacher = await testService.getByTeacher();
    res.status(200).send(byTeacher);
}

export async function insertTest(req: Request, res: Response) {
    const { name, pdfUrl, category, discipline, teacher } = res.locals.body;
    const teacherDiscipline = await teacherDisciplineService.findByInfo(
        teacher,
        discipline
    );
    await categoryService.findById(category);
    const test = await testService.insertTest(
        name,
        pdfUrl,
        category,
        teacherDiscipline.id
    );
    res.send(test);
}
