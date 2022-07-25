import { CreateTestData } from "../interfaces/testInterface.js";
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

async function insert(createTestData: CreateTestData) {
    return await prisma.test.create({
        data: createTestData,
    });
}

export default {
    findAllByDiscipline,
    findAllByTeacher,
    insert,
};
