import { prisma } from "./../config/database.js";

async function findByInfo(teacher: number, discipline: number) {
    return await prisma.teacherDiscipline.findFirst({
        where: {
            teacherId: teacher,
            disciplineId: discipline,
        },
    });
}

export default {
    findByInfo,
};
