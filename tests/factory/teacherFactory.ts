import { prisma } from "../../src/config/database.js";

export async function createTeacher(teacher: string) {
    return await prisma.teacher.upsert({
        where: { name: teacher },
        update: {},
        create: {
            name: teacher,
        },
    });
}
