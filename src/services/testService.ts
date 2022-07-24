import testRepository from "../repository/testRepository.js";

async function getByDiscipline() {
    const search = await testRepository.findAllByDiscipline();
    const terms = search.map((term) => {
        return {
            id: term.id,
            number: term.number,
            disciplines: term.Discipline.map((discipline) => {
                let tests = [];
                discipline.TeacherDiscipline.forEach((teacher) => {
                    tests = [...teacher.Test];
                });

                return {
                    id: discipline.id,
                    name: discipline.name,
                    tests,
                };
            }),
        };
    });
    return { terms };
}

export default {
    getByDiscipline,
};
