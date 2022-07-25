import { prisma } from "./../config/database.js";

async function findById(category: number) {
    return await prisma.category.findFirst({
        where: {
            id: category,
        },
    });
}

export default {
    findById,
};
