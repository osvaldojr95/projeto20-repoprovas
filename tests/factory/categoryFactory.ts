import { prisma } from "../../src/config/database.js";
import { CreateCategoryData } from "../../src/interfaces/categoryInterface.js";

export async function createCategory(category: CreateCategoryData) {
    const insertedCategory = await prisma.category.create({
        data: category,
    });

    return insertedCategory;
}
