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

async function findAllByTeacher() {
    return await prisma.teacher.findMany({
        include: {
            TeacherDiscipline: {
                include: {
                    Test: {
                        include: {
                            category: true,
                        },
                    },
                },
            },
        },
    });
}

export default {
    findAllByDiscipline,
    findAllByTeacher,
};
