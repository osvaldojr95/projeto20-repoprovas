import { prisma } from "../src/config/database.js";
import { createCategory } from "../tests/factory/categoryFactory.js";
import { createTerm } from "../tests/factory/termFactory.js";
import { createDiscipline } from "../tests/factory/disciplineFactory.js";
import { createTeacher } from "../tests/factory/teacherFactory.js";
import { createTeacherDiscipline } from "../tests/factory/teacherDisciplineFactory.js";

async function main() {
    const categories = [
        "Projeto",
        "Prática",
        "Recuperação",
        "P1",
        "P2",
        "P3",
        "VR",
        "VS",
    ];
    const terms = [1, 2, 3, 4, 5, 6];
    const disciplines = [
        { name: "HTML e CSS", termId: 1 },
        { name: "JavaScript", termId: 2 },
        { name: "React", termId: 3 },
        { name: "Humildade", termId: 1 },
        { name: "Planejamento", termId: 2 },
        { name: "Autoconfiança", termId: 3 },
    ];
    const teachers = ["Diego Pinho", "Bruna Hamori"];
    const teacherDisciplne = [
        { teacherId: 1, disciplineId: 1 },
        { teacherId: 1, disciplineId: 2 },
        { teacherId: 1, disciplineId: 3 },
        { teacherId: 2, disciplineId: 4 },
        { teacherId: 2, disciplineId: 5 },
        { teacherId: 2, disciplineId: 6 },
    ];

    for (let i = 0; i < categories.length; i++) {
        await createCategory(categories[i]);
    }
    for (let i = 0; i < terms.length; i++) {
        await createTerm(terms[i]);
    }
    for (let i = 0; i < disciplines.length; i++) {
        await createDiscipline(disciplines[i]);
    }
    for (let i = 0; i < teachers.length; i++) {
        await createTeacher(teachers[i]);
    }
    for (let i = 0; i < teacherDisciplne.length; i++) {
        await createTeacherDiscipline(teacherDisciplne[i]);
    }
}

main()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
