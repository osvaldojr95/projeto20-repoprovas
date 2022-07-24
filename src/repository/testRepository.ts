import { prisma } from "./../config/database.js";

async function findAllByDiscipline() {
    return await prisma.term.findMany({
        include: {
            Discipline: {
                include: {
                    TeacherDiscipline: {
                        include: {
                            Test: {},
                        },
                    },
                },
            },
        },
    });
}

export default {
    findAllByDiscipline,
};
