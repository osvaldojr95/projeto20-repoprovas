import teacherDisciplineRepository from "../repository/teacherDisciplineRepository.js";

async function findByInfo(teacher: number, discipline: number) {
    const teacherDiscipline = await teacherDisciplineRepository.findByInfo(
        teacher,
        discipline
    );
    if (!teacherDiscipline) throw { type: "notFound" };
    return teacherDiscipline;
}

export default {
    findByInfo,
};
