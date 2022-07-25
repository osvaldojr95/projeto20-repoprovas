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

async function getByTeacher() {
    const teacherDisciplines = await testRepository.findAllByTeacher();
    const obj = teacherDisciplines.map((teacher) => {
        let tests = [];
        let categories = [];
        teacher.TeacherDiscipline.forEach((discipline) => {
            if (discipline.Test.length > 0) tests = [...discipline.Test];
        });
        tests.forEach((test) => {
            if (
                !categories.find((category) => category.id === test.category.id)
            ) {
                categories.push(test.category);
            }
        });
        categories = categories.map((category) => {
            const testsByCategory = tests
                .filter((item) => {
                    console.log(item.category.id, category.id);
                    return item.category.id === category.id ? true : false;
                })
                .map((item) => {
                    return {
                        id: item.id,
                        name: item.name,
                        pdfUrl: item.pdfUrl,
                    };
                });

            return {
                id: category.id,
                name: category.name,
                tests: testsByCategory,
            };
        });

        return {
            id: teacher.id,
            name: teacher.name,
            categories,
        };
    });
    return { teachers: obj };
}

export default {
    getByDiscipline,
    getByTeacher,
};
