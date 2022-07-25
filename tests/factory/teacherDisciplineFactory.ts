import { prisma } from "../../src/config/database.js";
import { CreateTeacherDisciplineData } from "../../src/interfaces/teacherDisciplineInterface.js";

export async function createTeacherDiscipline(
    teacherDiscipline: CreateTeacherDisciplineData
) {
    return await prisma.teacherDiscipline.create({
        data: {
            teacherId: teacherDiscipline.teacherId,
            disciplineId: teacherDiscipline.disciplineId,
        },
    });
}
