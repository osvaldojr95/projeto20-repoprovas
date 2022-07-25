import categoryRepository from "../repository/categoryRepository.js";

async function findById(categoryId: number) {
    const category = await categoryRepository.findById(categoryId);
    if (!category) throw { type: "notFound" };
    return category;
}

export default {
    findById,
};
