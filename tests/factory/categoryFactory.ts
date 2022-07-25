import { prisma } from "../../src/config/database.js";

export async function createCategory(categoryName: string) {
    return await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: {
            name: categoryName,
        },
    });
}
