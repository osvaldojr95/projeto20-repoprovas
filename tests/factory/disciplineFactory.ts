import { prisma } from "../../src/config/database.js";
import { CreateDisciplineData } from "../../src/interfaces/disciplineInterface.js";

export async function createDiscipline(discipline: CreateDisciplineData) {
    return await prisma.discipline.upsert({
        where: { name: discipline.name },
        update: {},
        create: {
            termId: discipline.termId,
            name: discipline.name,
        },
    });
}
